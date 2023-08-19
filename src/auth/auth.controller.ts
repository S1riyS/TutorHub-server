import { Body, Controller, Get, HttpStatus, Post, Res, UnauthorizedException } from '@nestjs/common';
import { CreateUserDTO as RegisterDTO } from '@user/dto';
import { LoginDTO } from './dto';
import { AuthService } from './auth.service';
import { Tokens } from './interfaces';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { Cookie, Public, UserAgent } from '@common/decorators';
import { ApiBadRequestResponse, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { UserResponse } from '@user/responses';
import { TokensResponse } from './responses';

const REFRESH_TOKEN_COOKIE_NAME = 'REFRESH_TOKEN';

@Public()
@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    private readonly config: ConfigService,
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  @ApiOperation({ summary: 'Registration of new user' })
  @ApiOkResponse({ type: UserResponse })
  @ApiBadRequestResponse({ description: 'User with this credentials already exists' })
  register(@Body() dto: RegisterDTO) {
    console.log(dto);
    return this.authService.register(dto);
  }

  @Post('login')
  @ApiOperation({ summary: 'User login to the system' })
  @ApiOkResponse({ type: TokensResponse })
  @ApiUnauthorizedResponse({ description: 'Incorrect email or password' })
  async login(@Body() dto: LoginDTO, @Res() response: Response, @UserAgent() userAgent: string) {
    const tokens = await this.authService.login(dto, userAgent);
    this.setRefreshTokenToCookies(tokens, response);
  }

  @Get('refresh-tokens')
  @ApiOperation({ summary: 'Generates new pair of tokens (access and refresh)' })
  @ApiOkResponse({ type: TokensResponse })
  @ApiUnauthorizedResponse({ description: 'Something wrong with token' })
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
