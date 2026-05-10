import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterDto } from './dtos/register.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { UserRole } from 'src/users/entities/user.entity';
import { QueryFailedError } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userSerivce: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const { name, email, password, mobile } = dto;

    const existingUser = await this.userSerivce.findByEmail(email);

    if (existingUser) {
      throw new BadRequestException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const user = await this.userSerivce.create({
        name,
        email,
        password: hashedPassword,
        mobile,
        role: UserRole.USER,
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

  async login(dto: { email: string; password: string }) {
    const { email, password } = dto;

    const user = await this.userSerivce.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.jwtService.sign({
      userId: user.id,
      role: user.role,
    });

    return { access_token: token };
  }
}
