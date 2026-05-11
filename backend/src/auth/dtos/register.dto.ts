import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';
import { Role } from 'src/users/entities/user.entity';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @MinLength(6, {
    message: 'Password length should not be less than 6 character',
  })
  @IsNotEmpty()
  @IsString()
  password: string;

  @IsEnum(Role)
  role: Role;
}
