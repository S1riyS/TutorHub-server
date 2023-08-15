import { IsArray, IsDate, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { TeachingFormat } from '@prisma/client';

export class CreateTutorProfileDTO {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  bio: string;

  @IsNotEmpty()
  @IsDate()
  birthDate: Date;

  @IsArray()
  @IsEnum(TeachingFormat, { each: true })
  teachingFormats: TeachingFormat[];

  @IsNotEmpty()
  @IsInt()
  careerStartYear: number;
}

// TODO: add PartialType
// export class UpdateTutorProfileDTO extends PartialType(CreateTutorProfileDTO) {}
