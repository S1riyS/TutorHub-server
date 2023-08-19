import { Body, Controller, Get, HttpStatus, Post, Res, UnauthorizedException } from '@nestjs/common';
import { CreateUserDTO as RegisterDTO } from '@user/dto';
import { LoginDTO } from './dto';
import { AuthService } from './auth.service';
import { Tokens } from './interfaces';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { Cookie, Public, UserAgent } from '@common/decorators';

const REFRESH_TOKEN_COOKIE_NAME = 'REFRESH_TOKEN';

@Public()
@Controller('auth')
export class AuthController {
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
  async login(@Body() dto: LoginDTO, @Res() response: Response, @UserAgent() userAgent: string) {
    const tokens = await this.authService.login(dto, userAgent);
    this.setRefreshTokenToCookies(tokens, response);
  }

  @Get('refresh-tokens')
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
