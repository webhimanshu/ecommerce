import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dtos/register.dto';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/users/entities/user.entity';
import { QueryFailedError } from 'typeorm';
import { LoginDto } from './dtos/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const { name, email, password } = dto;

    const existingUser = await this.userService.findByEmail(email);

    if (existingUser) {
      throw new BadRequestException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const user = await this.userService.create({
        name,
        email,
        password: hashedPassword,
        role: Role.USER,
      });

      const { password: passwordHash, ...safeUser } = user;
      void passwordHash;
      return {
        message: 'User registered successfully',
        user: safeUser,
      };
    } catch (error) {
      if (
        error instanceof QueryFailedError &&
        typeof (error as QueryFailedError & { driverError?: { code?: string } })
          .driverError?.code === 'string' &&
        (error as QueryFailedError & { driverError?: { code?: string } })
          .driverError?.code === '23505'
      ) {
        throw new BadRequestException('Email or mobile already exists');
      }

      throw error;
    }
  }

  async login(dto: LoginDto) {
    const { email, password } = dto;
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.jwtService.sign(
      { sub: user.id, role: user.role, email: user.email },
      { expiresIn: '1h' },
    );

    return { access_token: token };
  }
}
