import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email: string;

  @MinLength(6)
  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  @Length(10, 15, { message: 'Mobile must be between 10 and 15 digits' })
  @Matches(/^\d+$/, { message: 'Mobile must contain only numbers' })
  mobile: string;
}
