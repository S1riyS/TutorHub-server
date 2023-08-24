import { Topic } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Exclude } from 'class-transformer';

export class TopicEntity implements Topic {
  @ApiProperty({ example: '2ed887a3-5bd5-4f70-a803-acc563b63a72' })
  id: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Подготовка к ЕГЭ' })
  name: string;

  @Exclude()
  subjectId: string;
}
