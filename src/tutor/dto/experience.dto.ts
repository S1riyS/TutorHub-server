import { IsInt, IsNotEmpty, IsString } from 'class-validator';

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
