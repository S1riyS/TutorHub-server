import { OmitType, PartialType } from '@nestjs/swagger';
import { UserEntity } from '@user/entities';

export class CreateUserDTO extends OmitType(UserEntity, ['id'] as const) {}

// In UpdateUserDTO fields 'email', 'password', 'role' are omitted, others are optional
export class UpdateUserDTO extends PartialType(OmitType(CreateUserDTO, ['email', 'password', 'role'] as const)) {}
