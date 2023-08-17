import { AchievementEntity } from '../entities';

export class AchievementResponse extends AchievementEntity {
  constructor(achievement: Partial<AchievementEntity>) {
    super();
    Object.assign(this, achievement);
  }
}
