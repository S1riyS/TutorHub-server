import { PartialType, PickType } from '@nestjs/swagger';
import { StudentProfileEntity } from '../entities';

export class CreateStudentProfileDTO extends PickType(StudentProfileEntity, ['grade'] as const) {}

export class UpdateStudentProfileDTO extends PartialType(CreateStudentProfileDTO) {}
