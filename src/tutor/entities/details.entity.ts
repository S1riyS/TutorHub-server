import { TutorDetails } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class DetailsEntity implements TutorDetails {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @ApiPropertyOptional({ example: 'This is going to be REALLY long text...' })
  bio: string | null;

  @IsOptional()
  @IsNotEmpty()
  @IsDateString()
  @ApiPropertyOptional({ example: '2005-07-04T13:00:00.000Z' })
  birthDate: Date | null;

  @IsOptional()
  @IsNotEmpty()
  @IsInt()
  @ApiPropertyOptional({ example: 2020 })
  careerStartYear: number | null;

  @Exclude()
  id: string;
  @Exclude()
  profileId: string;
}
