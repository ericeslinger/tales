import { MediaId, UserId } from './idtypes';
import { Timestamp } from '@firebase/firestore-types';

export interface User extends UserId {
  userId: string;
  email: string;
  name?: string;
  avatar?: string;
  rollPreference?: 'manual' | 'automatic' | 'ask';
}

export interface UserMedia extends MediaId {
  url: string;
  public: boolean;
  date: Date | Timestamp;
}
