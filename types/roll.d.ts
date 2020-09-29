import { Timestamp } from '@firebase/firestore-types';
import { Equipment, Weapon } from './equipment';
import { CharacterId } from './idtypes';
import { CharacterSkill, SkillType } from './skill';
import { Attribute, AttributeName } from './attribute';

export type RollState = 'requested' | 'rolled';

export interface RollMetadata {
  state: RollState;
  messageId?: string;
  roller: CharacterId;
  at: Date | Timestamp;
  archive: boolean;
}

export interface BasicRoll {
  type: SkillType;
  assets: number;
  edge: number;
  items: Equipment[];
}

export interface Initiative extends BasicRoll {
  type: 'initiative';
}

export interface Defense extends BasicRoll {
  type: 'defense';
  target: number;
  damage: number;
}

export interface Health extends BasicRoll {
  type: 'health';
  target: number;
}

export interface Noncombat extends BasicRoll {
  type: 'noncombat';
  target?: number;
  initiative: number;
  skills: string[];
}

export interface Attack extends BasicRoll {
  type: 'attack';
  target?: number;
  initiative: number;
  damage: number;
  skills: string[];
}

export interface BasicRequest {
  state: 'requested';
}

export interface BasicResult {
  state: 'rolled';
  success?: boolean;
  result: number;
  effort: number;
  critical: boolean;
  attribute: AttributeName;
  skill: CharacterSkill;
}

export type InitiativeRequest = Initiative & BasicRequest & RollMetadata;
export type DefenseRequest = Defense & BasicRequest & RollMetadata;
export type AttackRequest = Attack & BasicRequest & RollMetadata;
export type NoncombatRequest = Noncombat & BasicRequest & RollMetadata;
export type HealthRequest = Health & BasicRequest & RollMetadata;

export type InitiativeResult = Initiative & BasicResult & RollMetadata;
export type DefenseResult = Defense & BasicResult & RollMetadata;
export type AttackResult = Attack & BasicResult & RollMetadata;
export type NoncombatResult = Noncombat & BasicResult & RollMetadata;
export type HealthResult = Health & BasicResult & RollMetadata;

export type RollRequest =
  | InitiativeRequest
  | DefenseRequest
  | AttackRequest
  | NoncombatRequest
  | HealthRequest;

export type RollResult =
  | InitiativeResult
  | DefenseResult
  | AttackResult
  | NoncombatResult
  | HealthResult;
