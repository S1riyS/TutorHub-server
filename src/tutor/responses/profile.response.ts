import { ProfileEntity } from '../entities';

// export class BriefTutorProfileResponse extends OmitType(ProfileEntity, ['achievements'] as const) {
//   constructor(profile: Partial<ProfileEntity>) {
//     super();
//     Object.assign(this, profile);
//   }
// }

export class BriefTutorProfileResponse extends ProfileEntity {
  constructor(profile: Partial<ProfileEntity>) {
    super();
    Object.assign(this, profile);
  }
}

export class FullTutorProfileResponse extends ProfileEntity {
  constructor(profile: Partial<ProfileEntity>) {
    super();
    Object.assign(this, profile);
  }
}
