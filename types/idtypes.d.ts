export interface BasicId {
  type: 'character' | 'campaign' | 'user' | 'page' | 'media';
}

export interface UserId extends BasicId {
  type: 'user';
  userId: string;
}

export interface MediaId extends BasicId {
  type: 'media';
  userId: string;
  mediaId: string;
}

export interface CampaignId extends BasicId {
  type: 'campaign';
  campaignId: string;
}

export interface CharacterId extends BasicId {
  type: 'character';
  campaignId: string;
  characterId: string;
}

export interface PageId extends BasicId {
  type: 'page';
  pageId: string;
  collectionId: string;
}

export type Id = CharacterId | CampaignId | UserId | PageId;

// Types used to display information about a character or a user in an avatar/monogram
export interface BasePerson {
  avatar?: string;
  name: string;
}

export type UserPerson = UserId & BasePerson;
export type CharacterPerson = CharacterId & BasePerson;
export type Person = UserPerson | CharacterPerson;
