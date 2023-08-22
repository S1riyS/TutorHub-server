import { PartialType, PickType } from '@nestjs/swagger';
import { DetailsEntity } from '@tutor/entities';

export class UpdateDetailsDTO extends PartialType(
  PickType(DetailsEntity, ['bio', 'birthDate', 'careerStartYear'] as const),
) {}
