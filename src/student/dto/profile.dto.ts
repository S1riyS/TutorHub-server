import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateStudentProfileDTO {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ example: 10 })
  grade: number;
}

export class UpdateStudentProfileDTO extends PartialType(CreateStudentProfileDTO) {}
