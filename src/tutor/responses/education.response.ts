import { TutorEducation } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class EducationResponse implements TutorEducation {
  @ApiProperty({ example: '3bbe3379-e8a1-4cc1-9014-7ac6f8d198ef' })
  id: string;

  @ApiProperty({ example: 'ITMO' })
  educationalInstitutionName: string;

  @ApiProperty({ example: 'Направление - Программная инженерия' })
  description: string;

  @ApiProperty({ example: 2023 })
  graduationYear: number;

  @ApiProperty({ example: false })
  isConfirmed: boolean;

  @Exclude()
  tutorProfileId: string | null;

  constructor(education: Partial<TutorEducation>) {
    Object.assign(this, education);
  }
}
