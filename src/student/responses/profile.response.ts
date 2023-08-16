import { StudentProfile } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class ProfileResponse implements StudentProfile {
  id: string;
  grade: number;

  @Exclude()
  createdAt: Date;
  @Exclude()
  updatedAt: Date;
  @Exclude()
  userId: string;

  constructor(profile: Partial<StudentProfile>) {
    Object.assign(this, profile);
  }
}
