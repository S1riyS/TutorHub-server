import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateEducationDTO {
  @IsNotEmpty()
  @IsString()
  educationalInstitutionName: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsInt()
  graduationYear: number;
}
