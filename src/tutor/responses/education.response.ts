import { TutorEducation } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class EducationResponse implements TutorEducation {
  id: string;
  educationalInstitutionName: string;
  description: string;
  graduationYear: number;
  isConfirmed: boolean;

  @Exclude()
  tutorProfileId: string | null;

  constructor(education: Partial<TutorEducation>) {
    Object.assign(this, education);
  }
}
