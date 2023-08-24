import { Subject } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class SubjectEntity implements Subject {
  @ApiProperty({ example: 'ab250e4f-30cc-4e25-aea5-63841a377aad' })
  id: string;

  @IsNotEmpty()
  @IsString()
  @Transform((param) => param.value.charAt(0).toUpperCase() + param.value.slice(1))
  @ApiProperty({ example: 'Английский' })
  name: string;
}
