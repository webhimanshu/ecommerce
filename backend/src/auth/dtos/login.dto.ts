import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @MinLength(6, {
    message: 'Password length should not be less than 6 character',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}