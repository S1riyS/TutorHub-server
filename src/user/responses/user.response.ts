import { UserEntity } from '@user/entities';

export class UserResponse extends UserEntity {
  constructor(user: Partial<UserEntity>) {
    super();
    Object.assign(this, user);
  }
}
