import { TutorProfileEntity } from '../entities';
import { AchievementResponse } from './achievement.response';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { DetailsResponse } from '@tutor/responses';

export class FullTutorProfileResponse extends TutorProfileEntity {
  @Type(() => DetailsResponse)
  @ApiProperty({ type: DetailsResponse })
  details: DetailsResponse;

  @Type(() => AchievementResponse)
  @ApiProperty({ type: [AchievementResponse] })
  achievements: AchievementResponse[];

  constructor(profile: Partial<TutorProfileEntity>) {
    super();
    Object.assign(this, profile);
  }
}
