import { TopicEntity } from '@subject/entities';

export class TopicResponse extends TopicEntity {
  constructor(topic: Partial<TopicEntity>) {
    super();
    Object.assign(this, topic);
  }
}
