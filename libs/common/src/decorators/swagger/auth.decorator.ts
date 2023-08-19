import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCookieAuth,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UserResponse } from '@user/responses';
import { TokensResponse } from '../../../../../src/auth/responses';
import { CreateUserDTO as RegisterDTO } from '@user/dto';
import { LoginDTO } from '../../../../../src/auth/dto';

export function AuthRegistrationSwaggerDecorator() {
  return applyDecorators(
    ApiOperation({ summary: 'Registration of new user' }),
    ApiBody({ type: RegisterDTO }),
    ApiOkResponse({ type: UserResponse }),
    ApiBadRequestResponse({ description: 'User with this credentials already exists' }),
  );
}

export function AuthLoginSwaggerDecorator() {
  return applyDecorators(
    ApiOperation({ summary: 'User login to the system' }),
    ApiBody({ type: LoginDTO }),
    ApiOkResponse({ type: TokensResponse }),
    ApiUnauthorizedResponse({ description: 'Incorrect email or password' }),
  );
}

export function AuthRefreshTokensSwaggerDecorator() {
  return applyDecorators(
    ApiOperation({ summary: 'Generates new pair of tokens (access and refresh)' }),
    ApiOkResponse({ type: TokensResponse }),
    ApiUnauthorizedResponse({ description: 'Something wrong with token' }),
    ApiCookieAuth(),
  );
}
