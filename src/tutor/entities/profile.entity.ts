import { $Enums, TeachingFormat, TutorProfile } from '@prisma/client';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsArray, IsDateString, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ProfileEntity implements TutorProfile {
  @ApiProperty({ example: '72c82fcb-1f44-43cb-af63-a6b8156f36bc' })
  id: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @ApiPropertyOptional({ example: 'This is going to be REALLY long text...' })
  bio: string | null;

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty({ example: '2005-07-04T13:00:00.000Z' })
  birthDate: Date;

  @IsNotEmpty()
  @IsInt()
  @ApiProperty({ example: 2020 })
  careerStartYear: number;

  @IsArray()
  @IsEnum(TeachingFormat, { each: true })
  @ApiProperty({ example: [$Enums.TeachingFormat.REMOTELY] })
  teachingFormats: $Enums.TeachingFormat[];

  @Exclude()
  createdAt: Date;
  @Exclude()
  updatedAt: Date;
  @Exclude()
  userId: string;
}
