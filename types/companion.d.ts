import { CharacterBase } from './character_base';
import { Attribute, Health, Loyalty } from './attribute';
import { CharacterSkill } from './skill';

export interface Companion extends CharacterBase {
  subtype: 'companion';
  attack: number;
  defend: number;
  baseInitiative: number;
  attributes: {
    health: Health;
    loyalty: Loyalty;
  };
  armor: number;
  skills?: CharacterSkill[];
}
