import { UserEntity } from '@user/entities';
import { Exclude } from 'class-transformer';

export class UserResponse extends UserEntity {
  @Exclude()
  password: string;

  constructor(user: Partial<UserEntity>) {
    super();
    Object.assign(this, user);
  }
}
