import { CharacterBase } from './character_base';

export interface NonplayerCharacter extends CharacterBase {
  type: 'nonplayer';
  attack: number;
  defend: number;
  health: number;
  armor: number;
}
