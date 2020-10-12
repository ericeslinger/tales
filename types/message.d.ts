import { Timestamp } from '@firebase/firestore-types';

import { SkillType, CharacterSkill } from './skill';
import { AttributeName } from './attribute';
import { Id } from './idtypes';
import { Equipment } from './equipment';

export type MessageType = 'rollRequest' | 'rollComplete' | 'say';
export type MessageTarget = 'campaign' | 'character';
export type MessageState = 'new' | 'viewed' | 'archived';

export interface BaseMessage {
  messageId: string;
  messageType: MessageType;
  state: MessageState;
  to: Id;
  from: Id;
  description: string;
  at: Date | Timestamp;
}

export interface Say extends BaseMessage {
  messageType: 'say';
}
