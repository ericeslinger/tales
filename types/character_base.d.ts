import { Acl } from './acl';
import { Action } from './action';
import { Effect } from './effect';
import { CharacterId } from './idtypes';
import { Item } from './item';

export type CharacterType = 'player' | 'nonplayer' | 'companion';

export interface CharacterBase extends CharacterId {
  name: string;
  description: string;
  acl: Acl;
  subtype: CharacterType;
  initiative: number;
  equipped: Item[];
  carried: Item[];
  abilities: Action[];
  auras: Effect[];
}
