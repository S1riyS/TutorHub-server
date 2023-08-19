import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDTO as RegisterDTO } from '@user/dto';
import { LoginDTO } from './dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() dto: RegisterDTO) {
    console.log(dto);
    return this.authService.register(dto);
  }

  @Post('login')
  async login(@Body() dto: LoginDTO) {
    const tokens = await this.authService.login(dto);
    return { accessToken: tokens.accessToken };
  }

  @Get('refresh')
  refreshTokens() {}
}
