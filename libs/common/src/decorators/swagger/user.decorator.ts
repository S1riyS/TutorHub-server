import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiNotFoundResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
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
    ApiOperation({ summary: 'Updates user with given ID' }),
    ApiBody({ type: UpdateUserDTO }),
    ApiOkResponse({ type: UserResponse }),
    ApiNotFoundResponse({ description: 'User not found' }),
    ApiBearerAuth('JWT-auth'),
  );
}

export function UserDeleteSwaggerDecorator() {
  return applyDecorators(
    ApiOperation({ summary: 'Deletes user with given ID' }),
    ApiOkResponse({ type: DeleteResponse }),
    ApiBearerAuth('JWT-auth'),
  );
}
