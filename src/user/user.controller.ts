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
import { DeleteResponse, UserResponse } from '@user/responses';
import { User } from '@prisma/client';
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('Users')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'Retrieves all users' })
  @ApiOkResponse({ type: [UserResponse] })
  async findAll() {
    const users = await this.userService.findAll();
    return users.map((user: User) => new UserResponse(user));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieves user with given ID' })
  @ApiOkResponse({ type: UserResponse })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const user = await this.userService.findOne(id);
    return new UserResponse(user);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Updates user with given ID' })
  @ApiOkResponse({ type: UserResponse })
  @ApiNotFoundResponse({ description: 'User not found' })
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateUserDTO) {
    const user = await this.userService.update(id, dto);
    return new UserResponse(user);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletes user with given ID' })
  @ApiOkResponse({ type: DeleteResponse })
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.delete(id);
  }
}
