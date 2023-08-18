import { OmitType, PartialType, PickType } from '@nestjs/swagger';
import { UserEntity } from '@user/entities';

export class CreateUserDTO extends PickType(UserEntity, [
  'email',
  'password',
  'firstName',
  'lastName',
  'middleName',
  'imageLink',
  'phoneNumber',
  'role',
] as const) {}

export class UpdateUserDTO extends PartialType(OmitType(CreateUserDTO, ['email', 'password', 'role'] as const)) {}
