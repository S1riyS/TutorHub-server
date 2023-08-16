import { StudentProfile } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class ProfileResponse implements StudentProfile {
  @ApiProperty({ example: '72c82fcb-1f44-43cb-af63-a6b8156f36bc' })
  id: string;

  @ApiProperty({ example: 10 })
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
