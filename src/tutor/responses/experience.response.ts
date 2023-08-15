import { TutorExperince } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class ExperienceResponse implements TutorExperince {
  id: string;
  jobName: string;
  startYear: number;
  endYear: number | null;
  isConfirmed: boolean;

  @Exclude()
  tutorProfileId: string | null;

  constructor(experience: Partial<TutorExperince>) {
    Object.assign(this, experience);
  }
}
