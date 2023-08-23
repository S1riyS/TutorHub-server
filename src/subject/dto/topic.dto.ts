import { OmitType, PickType } from '@nestjs/swagger';
import { TopicEntity } from '@subject/entities';

export class CreateTopicDTO extends PickType(TopicEntity, ['name', 'nameForURL'] as const) {}

export class UpdateTopicDTO extends OmitType(CreateTopicDTO, ['nameForURL'] as const) {}
