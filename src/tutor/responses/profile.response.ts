import { $Enums, TutorProfile } from '@prisma/client';
import { Exclude, Type } from 'class-transformer';
import { EducationResponse } from './education.response';
import { ExperienceResponse } from './experience.response';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

interface FullTutorProfile extends TutorProfile {
  education: EducationResponse[];
  experience: ExperienceResponse[];
}

export class ProfileResponse implements FullTutorProfile {
  @ApiProperty({ example: '72c82fcb-1f44-43cb-af63-a6b8156f36bc' })
  id: string;

  @ApiPropertyOptional({ example: 'This is going to be REALLY long text...' })
  bio: string | null;

  @ApiProperty({ example: '2005-07-04T13:00:00.000Z' })
  birthDate: Date;

  @ApiProperty({ example: 2020 })
  careerStartYear: number;

  @ApiProperty({ example: [$Enums.TeachingFormat.REMOTELY] })
  teachingFormats: $Enums.TeachingFormat[];

  @Type(() => EducationResponse)
  @ApiProperty({ type: [EducationResponse] })
  education: EducationResponse[];

  @Type(() => ExperienceResponse)
  @ApiProperty({ type: [ExperienceResponse] })
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
