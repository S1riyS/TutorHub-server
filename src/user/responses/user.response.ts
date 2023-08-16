import { $Enums, User } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class UserResponse implements User {
  id: string;
  email: string;
  firstName: string;
  imageLink: string | null;
  lastName: string;
  middleName: string;
  phoneNumber: string;
  role: $Enums.Role;

  @Exclude()
  password: string;

  constructor(user: Partial<User>) {
    Object.assign(this, user);
  }
}
