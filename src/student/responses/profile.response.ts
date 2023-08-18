import { StudentProfile } from '@prisma/client';
import { StudentProfileEntity } from '../entities';

export class StudentProfileResponse extends StudentProfileEntity {
  constructor(profile: Partial<StudentProfile>) {
    super();
    Object.assign(this, profile);
  }
}
