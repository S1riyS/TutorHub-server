import { PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateStudentProfileDTO {
  @IsNotEmpty()
  @IsNumber()
  grade: number;
}

export class UpdateStudentProfileDTO extends PartialType(CreateStudentProfileDTO) {}
