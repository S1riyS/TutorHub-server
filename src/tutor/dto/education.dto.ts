import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { PartialType } from '@nestjs/swagger';

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

export class UpdateEducationDTO extends PartialType(CreateEducationDTO) {}
