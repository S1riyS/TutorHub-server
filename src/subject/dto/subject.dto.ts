import { PartialType, PickType } from '@nestjs/swagger';
import { SubjectEntity } from '@subject/entities';

export class CreateSubjectDTO extends PickType(SubjectEntity, ['name'] as const) {}

export class UpdateSubjectDTO extends PartialType(CreateSubjectDTO) {}
