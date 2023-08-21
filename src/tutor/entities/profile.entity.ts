import { $Enums, TeachingFormat, TutorProfile } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsArray, IsEnum } from 'class-validator';

export class TutorProfileEntity implements TutorProfile {
  @ApiProperty({ example: '72c82fcb-1f44-43cb-af63-a6b8156f36bc' })
  id: string;

  @IsArray()
  @IsEnum(TeachingFormat, { each: true })
  @ApiProperty({ example: [$Enums.TeachingFormat.REMOTELY], enum: $Enums.TeachingFormat })
  teachingFormats: $Enums.TeachingFormat[];

  @Exclude()
  createdAt: Date;
  @Exclude()
  updatedAt: Date;
  @Exclude()
  userId: string;
}
