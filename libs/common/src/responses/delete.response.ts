import { ApiProperty } from '@nestjs/swagger';

export class DeleteResponse {
  @ApiProperty({ example: '07abea78-7035-42c1-928d-1ef4f981267e' })
  id: string;
}
