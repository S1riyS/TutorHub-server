import { AchievementEntity } from '../entities';
import { OmitType } from '@nestjs/swagger';

export class AchievementResponse extends AchievementEntity {
  constructor(achievement: Partial<AchievementEntity>) {
    super();
    Object.assign(this, achievement);
  }
}

export class GroupedAchievementResponse extends OmitType(AchievementResponse, ['category'] as const) {}
