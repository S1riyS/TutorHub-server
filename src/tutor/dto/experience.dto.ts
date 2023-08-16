import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';

export class CreateExperienceDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Senior backend developer' })
  jobName: string;

  @IsNotEmpty()
  @IsInt()
  @ApiProperty({ example: 2020 })
  startYear: number;

  @IsOptional()
  @IsNotEmpty()
  @IsInt()
  @ApiPropertyOptional({ example: 2022 })
  endYear?: number;
}

export class UpdateExperienceDTO extends PartialType(CreateExperienceDTO) {}
