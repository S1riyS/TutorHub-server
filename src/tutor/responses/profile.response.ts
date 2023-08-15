import { $Enums, TutorProfile } from '@prisma/client';
import { Exclude, Type } from 'class-transformer';
import { EducationResponse } from './education.response';
import { ExperienceResponse } from './experience.response';

interface FullTutorProfile extends TutorProfile {
  education: EducationResponse[];
  experience: ExperienceResponse[];
}

export class ProfileResponse implements FullTutorProfile {
  id: string;
  bio: string | null;
  birthDate: Date;
  careerStartYear: number;
  teachingFormats: $Enums.TeachingFormat[];

  @Type(() => EducationResponse)
  education: EducationResponse[];

  @Type(() => ExperienceResponse)
  experience: ExperienceResponse[];

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  @Exclude()
  userId: string;

  constructor(profile: Partial<FullTutorProfile>) {
    Object.assign(this, profile);
  }
}
