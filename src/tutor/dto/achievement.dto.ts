import { ApiProperty, PartialType, PickType } from '@nestjs/swagger';
import { AchievementEntity } from '../entities';

export class CreateAchievementDTO extends PickType(AchievementEntity, [
  'data',
  'startYear',
  'endYear',
  'category',
] as const) {
  @ApiProperty({ type: 'string', format: 'binary' })
  attachment: Express.Multer.File;
}

export class UpdateAchievementDTO extends PartialType(CreateAchievementDTO) {}
