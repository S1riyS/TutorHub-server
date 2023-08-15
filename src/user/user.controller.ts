import { Body, Controller, Delete, Param, ParseUUIDPipe, Put } from '@nestjs/common';
import { UserService } from '@user/user.service';
import { User } from '@prisma/client';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Put(':id')
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() user: Partial<User>) {
    return this.userService.save(user);
  }

  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.delete(id);
  }
}
