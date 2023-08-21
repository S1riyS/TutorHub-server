import { DetailsEntity } from '../entities';

export class DetailsResponse extends DetailsEntity {
  constructor(details: Partial<DetailsEntity>) {
    super();
    Object.assign(this, details);
  }
}
