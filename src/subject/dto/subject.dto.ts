import { PartialType, PickType } from '@nestjs/swagger';
import { SubjectEntity } from '@subject/entities';

export class CreateSubjectDTO extends PickType(SubjectEntity, ['name', 'nameForURL'] as const) {}

export class UpdateSubjectDTO extends PartialType(CreateSubjectDTO) {}
