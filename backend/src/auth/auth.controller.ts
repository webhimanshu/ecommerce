import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dtos/register.dto';
import { LoginDto } from './dtos/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authSerice: AuthService) {}

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authSerice.register(dto);
  }

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authSerice.login(dto);
  }
}
