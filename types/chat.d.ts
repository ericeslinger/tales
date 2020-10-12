import { User } from './user';
import { Timestamp } from '@firebase/firestore-types';
import { UserService } from 'src/app/components/user/user.service';

export interface TextMessage {
  type: 'text';
  text: string;
  sender: User;
  date: Date | Timestamp;
}

export interface ImageMessage {
  type: 'image';
  url: string;
  sender: User;
  date: Date | Timestamp;
}

export type Message = TextMessage | ImageMessage;
