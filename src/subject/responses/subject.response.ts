import { SubjectEntity } from '@subject/entities';
import { TopicResponse } from './topic.response';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class SubjectResponse extends SubjectEntity {
  constructor(subject: Partial<SubjectEntity>) {
    super();
    Object.assign(this, subject);
  }
}

export class FullSubjectResponse extends SubjectResponse {
  @ApiProperty({ type: [TopicResponse] })
  @Type(() => TopicResponse)
  topics: TopicResponse[];
}
