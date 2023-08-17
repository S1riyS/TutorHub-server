import { ProfileEntity } from '../entities';
import { AchievementResponse } from './achievement.response';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class TutorProfileResponse extends ProfileEntity {
  constructor(profile: Partial<ProfileEntity>) {
    super();
    Object.assign(this, profile);
  }
}

export class FullTutorProfileResponse extends TutorProfileResponse {
  @Type(() => AchievementResponse)
  @ApiProperty({ type: [AchievementResponse] })
  achievements: AchievementResponse[];
}
