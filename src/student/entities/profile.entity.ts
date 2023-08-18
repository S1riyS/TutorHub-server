import { StudentProfile } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsNotEmpty, IsNumber, Max, Min } from 'class-validator';

export class StudentProfileEntity implements StudentProfile {
  @ApiProperty({ example: '72c82fcb-1f44-43cb-af63-a6b8156f36bc' })
  id: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(11)
  @ApiProperty({ example: 10 })
  grade: number;

  @Exclude()
  createdAt: Date;
  @Exclude()
  updatedAt: Date;
  @Exclude()
  userId: string;
}
