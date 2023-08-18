import { PartialType, PickType } from '@nestjs/swagger';
import { TutorProfileEntity } from '../entities';

export class CreateTutorProfileDTO extends PickType(TutorProfileEntity, [
  'bio',
  'birthDate',
  'careerStartYear',
  'teachingFormats',
] as const) {}

export class UpdateTutorProfileDTO extends PartialType(CreateTutorProfileDTO) {}
