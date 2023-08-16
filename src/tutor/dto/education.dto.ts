import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateEducationDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'ITMO' })
  educationalInstitutionName: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Направление - Программная инженерия' })
  description: string;

  @IsNotEmpty()
  @IsInt()
  @ApiProperty({ example: 2023 })
  graduationYear: number;
}

export class UpdateEducationDTO extends PartialType(CreateEducationDTO) {}
