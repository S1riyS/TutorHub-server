import { TutorProfileEntity } from '../entities';
import { AchievementResponse } from './achievement.response';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class TutorProfileResponse extends TutorProfileEntity {
  constructor(profile: Partial<TutorProfileEntity>) {
    super();
    Object.assign(this, profile);
  }
}

export class FullTutorProfileResponse extends TutorProfileResponse {
  @Type(() => AchievementResponse)
  @ApiProperty({ type: [AchievementResponse] })
  achievements: AchievementResponse[];
}
