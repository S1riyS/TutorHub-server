import { Body, Controller, Get, HttpStatus, Post, Res, UnauthorizedException } from '@nestjs/common';
import { CreateUserDTO as RegisterDTO } from '@user/dto';
import { LoginDTO } from './dto';
import { AuthService } from './auth.service';
import { Tokens } from './interfaces';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { Cookie, Public, UserAgent } from '@common/decorators';
import { ApiTags } from '@nestjs/swagger';
import { REFRESH_TOKEN_COOKIE_NAME } from '@common/constants';
import {
  AuthLoginSwaggerDecorator,
  AuthRefreshTokensSwaggerDecorator,
  AuthRegistrationSwaggerDecorator,
} from '@common/decorators/swagger';

@Public()
@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    private readonly config: ConfigService,
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  @AuthRegistrationSwaggerDecorator()
  register(@Body() dto: RegisterDTO) {
    console.log(dto);
    return this.authService.register(dto);
  }

  @Post('login')
  @AuthLoginSwaggerDecorator()
  async login(@Body() dto: LoginDTO, @Res() response: Response, @UserAgent() userAgent: string) {
    const tokens = await this.authService.login(dto, userAgent);
    this.setRefreshTokenToCookies(tokens, response);
  }

  @Get('refresh-tokens')
  @AuthRefreshTokensSwaggerDecorator()
  async refreshTokens(
    @Cookie(REFRESH_TOKEN_COOKIE_NAME) refreshToken: string,
    @Res() response: Response,
    @UserAgent() userAgent: string,
  ) {
    if (!refreshToken) throw new UnauthorizedException();
    const tokens = await this.authService.refreshTokens(refreshToken, userAgent);
    this.setRefreshTokenToCookies(tokens, response);
  }

  private setRefreshTokenToCookies(tokens: Tokens, response: Response) {
    if (!tokens) throw new UnauthorizedException();

    response.cookie(REFRESH_TOKEN_COOKIE_NAME, tokens.refreshToken.value, {
      httpOnly: true,
      sameSite: 'lax',
      expires: new Date(tokens.refreshToken.exp),
      secure: this.config.get('NODE_ENV') === 'production',
      path: '/',
    });
    response.status(HttpStatus.CREATED).json({ accessToken: tokens.accessToken });
  }
}
