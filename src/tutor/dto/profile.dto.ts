import { IsArray, IsDateString, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { TeachingFormat } from '@prisma/client';
import { PartialType } from '@nestjs/swagger';

export class CreateTutorProfileDTO {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  bio?: string;

  @IsNotEmpty()
  @IsDateString()
  birthDate: Date;

  @IsArray()
  @IsEnum(TeachingFormat, { each: true })
  teachingFormats: TeachingFormat[];

  @IsNotEmpty()
  @IsInt()
  careerStartYear: number;
}

export class UpdateTutorProfileDTO extends PartialType(CreateTutorProfileDTO) {}
