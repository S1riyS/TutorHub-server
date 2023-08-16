import { $Enums, User } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UserResponse implements User {
  @ApiProperty({ example: 1 })
  id: string;

  @ApiProperty({ example: 'test@gmail.com' })
  email: string;

  @ApiProperty({ example: 'Петров' })
  firstName: string;

  @ApiProperty({ example: 'Иван' })
  lastName: string;

  @ApiProperty({ example: 'Викторович' })
  middleName: string;

  @ApiProperty()
  imageLink: string | null;

  @ApiProperty({ example: '+78005553535' })
  phoneNumber: string;

  @ApiProperty({ example: $Enums.Role.TUTOR })
  role: $Enums.Role;

  @Exclude()
  password: string;

  constructor(user: Partial<User>) {
    Object.assign(this, user);
  }
}
