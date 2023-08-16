import { ApiProperty } from '@nestjs/swagger';

export class DeleteResponse {
  @ApiProperty({ example: 1 })
  id: string;
}
