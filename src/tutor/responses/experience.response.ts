import { TutorExperince } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class ExperienceResponse implements TutorExperince {
  @ApiProperty({ example: '2dc4ae3d-860c-4278-9bbd-83069ab6748a' })
  id: string;

  @ApiProperty({ example: 'Senior backend developer' })
  jobName: string;

  @ApiProperty({ example: 2020 })
  startYear: number;

  @ApiProperty({ example: 2022 })
  endYear: number | null;

  @ApiProperty({ example: false })
  isConfirmed: boolean;

  @Exclude()
  tutorProfileId: string | null;

  constructor(experience: Partial<TutorExperince>) {
    Object.assign(this, experience);
  }
}
