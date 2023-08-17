import { ProfileEntity } from '../entities';
import { AchievementResponse } from './achievement.response';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

// export class BriefTutorProfileResponse extends OmitType(ProfileEntity, ['achievements'] as const) {
//   constructor(profile: Partial<ProfileEntity>) {
//     super();
//     Object.assign(this, profile);
//   }
// }

export class FullTutorProfileResponse extends ProfileEntity {
  @Type(() => AchievementResponse)
  @ApiProperty({ type: [AchievementResponse] })
  achievements: AchievementResponse[];

  constructor(profile: Partial<ProfileEntity>) {
    super();
    Object.assign(this, profile);
  }
}

// export class BriefTutorProfileResponse extends OmitType(FullTutorProfileResponse, ['achievements'] as const) {}
export class BriefTutorProfileResponse extends ProfileEntity {
  constructor(profile: Partial<ProfileEntity>) {
    super();
    Object.assign(this, profile);
  }
}
