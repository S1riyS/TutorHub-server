import { Tokens } from '../interfaces';
import { Token } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

export class TokensResponse implements Tokens {
  @ApiProperty({ example: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjRmOTEyNjY1LTcxO...' })
  accessToken: string;

  @Exclude()
  refreshToken: Token;
}
