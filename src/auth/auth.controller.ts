import { Body, Controller, Get, HttpStatus, Post, Res, UnauthorizedException } from '@nestjs/common';
import { CreateUserDTO as RegisterDTO } from '@user/dto';
import { LoginDTO } from './dto';
import { AuthService } from './auth.service';
import { Tokens } from './interfaces';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
  private readonly REFRESH_TOKEN_COOKIE_NAME = 'REFRESH_TOKEN';

  constructor(
    private readonly config: ConfigService,
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  register(@Body() dto: RegisterDTO) {
    console.log(dto);
    return this.authService.register(dto);
  }

  @Post('login')
  async login(@Body() dto: LoginDTO, @Res() response: Response) {
    const tokens = await this.authService.login(dto);
    this.setRefreshTokenToCookies(tokens, response);
  }

  @Get('refresh')
  refreshTokens() {}

  private setRefreshTokenToCookies(tokens: Tokens, response: Response) {
    if (!tokens) throw new UnauthorizedException('');

    response.cookie(this.REFRESH_TOKEN_COOKIE_NAME, tokens.refreshToken.value, {
      httpOnly: true,
      sameSite: 'lax',
      expires: new Date(tokens.refreshToken.exp),
      secure: this.config.get('NODE_ENV') === 'production',
      path: '/',
    });
    response.status(HttpStatus.CREATED).json({ accessToken: tokens.accessToken });
  }
}
