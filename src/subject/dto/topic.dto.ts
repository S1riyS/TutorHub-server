import { PartialType, PickType } from '@nestjs/swagger';
import { TopicEntity } from '@subject/entities';

export class CreateTopicDTO extends PickType(TopicEntity, ['name'] as const) {}

export class UpdateTopicDTO extends PartialType(CreateTopicDTO) {}
