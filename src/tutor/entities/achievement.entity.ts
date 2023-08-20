import { $Enums, TutorAchievement } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class AchievementEntity implements TutorAchievement {
  @ApiProperty({ example: '4028949b-0931-4954-a522-b36afeeb84f4' })
  id: string;

  @ApiProperty({ example: 'ИТМО, направление - Прикладная математика и информатика' })
  @IsNotEmpty()
  @IsString()
  data: string;

  @ApiProperty({ example: 2020 })
  @IsNotEmpty()
  @IsNumber()
  startYear: number;

  @ApiPropertyOptional({ example: 2024 })
  @IsOptional()
  @IsNumber()
  endYear: number | null;

  @ApiProperty({ example: $Enums.TutorAchievementCategory.EDUCATION, enum: $Enums.TutorAchievementCategory })
  @IsNotEmpty()
  @IsEnum($Enums.TutorAchievementCategory)
  category: $Enums.TutorAchievementCategory;

  @ApiPropertyOptional({ example: '/static/url_to_image.png' })
  attachmentUrl: string | null;

  @ApiProperty({ example: false })
  isConfirmed: boolean;

  @Exclude()
  createdAt: Date;
  @Exclude()
  updatedAt: Date;
  @Exclude()
  tutorProfileId: string | null;
}
