import { PickType } from '@nestjs/swagger';
import { TutorProfileEntity } from '@tutor/entities';

export class TeachingFormatsResponse extends PickType(TutorProfileEntity, ['teachingFormats'] as const) {}
