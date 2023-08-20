import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from '@user/user.service';
import { UpdateUserDTO } from '@user/dto';
import { UserResponse } from '@user/responses';
import { User } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';
import { CurrentUser, Public } from '@common/decorators';
import {
  UserDeleteSwaggerDecorator,
  UserFindAllSwaggerDecorator,
  UserFindOneSwaggerDecorator,
  UserUpdateSwaggerDecorator,
} from '@common/decorators/swagger';
import { JwtPayload } from '@auth/interfaces';

@Controller('users')
@ApiTags('Users')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Public()
  @UserFindAllSwaggerDecorator()
  async findAll() {
    const users = await this.userService.findAll();
    return users.map((user: User) => new UserResponse(user));
  }

  @Get(':id')
  @Public()
  @UserFindOneSwaggerDecorator()
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const user = await this.userService.findOne(id, true);
    return new UserResponse(user);
  }

  @Put('self')
  @UserUpdateSwaggerDecorator()
  async update(@CurrentUser('id') id: string, @Body() dto: UpdateUserDTO) {
    const user = await this.userService.update(id, dto);
    return new UserResponse(user);
  }

  @Delete(':id')
  @UserDeleteSwaggerDecorator()
  async delete(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() currentUser: JwtPayload) {
    return this.userService.delete(id, currentUser);
  }
}
