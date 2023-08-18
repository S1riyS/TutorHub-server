import { PickType } from '@nestjs/swagger';
import { UserEntity } from '@user/entities';

export class LoginDTO extends PickType(UserEntity, ['email', 'password']) {}
