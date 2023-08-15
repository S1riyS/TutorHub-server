import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { PartialType } from '@nestjs/swagger';

export class CreateExperienceDTO {
  @IsNotEmpty()
  @IsString()
  jobName: string;

  @IsNotEmpty()
  @IsInt()
  startYear: number;

  @IsNotEmpty()
  @IsInt()
  endYear: number;
}

export class UpdateExperienceDTO extends PartialType(CreateExperienceDTO) {}
