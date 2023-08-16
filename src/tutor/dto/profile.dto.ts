import { IsArray, IsDateString, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { $Enums, TeachingFormat } from '@prisma/client';
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';

export class CreateTutorProfileDTO {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @ApiPropertyOptional({ example: 'This is going to be REALLY long text...' })
  bio?: string;

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty({ example: '2005-07-04T13:00:00.000Z' })
  birthDate: Date;

  @IsArray()
  @IsEnum(TeachingFormat, { each: true })
  @ApiProperty({ example: [$Enums.TeachingFormat.REMOTELY] })
  teachingFormats: TeachingFormat[];

  @IsNotEmpty()
  @IsInt()
  @ApiProperty({ example: 2020 })
  careerStartYear: number;
}

export class UpdateTutorProfileDTO extends PartialType(CreateTutorProfileDTO) {}
