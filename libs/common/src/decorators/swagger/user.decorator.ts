import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { UserResponse } from '@user/responses';
import { UpdateUserDTO } from '@user/dto';
import { DeleteResponse } from '@common/responses';

export function UserFindAllSwaggerDecorator() {
  return applyDecorators(ApiOperation({ summary: 'Retrieves all users' }), ApiOkResponse({ type: [UserResponse] }));
}

export function UserFindOneSwaggerDecorator() {
  return applyDecorators(
    ApiOperation({ summary: 'Retrieves user with given ID' }),
    ApiOkResponse({ type: UserResponse }),
    ApiNotFoundResponse({ description: 'User not found' }),
  );
}

export function UserUpdateSwaggerDecorator() {
  return applyDecorators(
    ApiOperation({ summary: 'Updates authorized user' }),
    ApiBody({ type: UpdateUserDTO }),
    ApiOkResponse({ type: UserResponse }),
    ApiForbiddenResponse({ description: "User can't be updated" }),
    ApiNotFoundResponse({ description: 'User not found' }),
    ApiBearerAuth('JWT-auth'),
  );
}

export function UserDeleteSwaggerDecorator() {
  return applyDecorators(
    ApiOperation({ summary: 'Deletes user with given ID' }),
    ApiOkResponse({ type: DeleteResponse }),
    ApiForbiddenResponse({ description: "User can't be deleted" }),
    ApiBearerAuth('JWT-auth'),
  );
}
