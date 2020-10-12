import { Timestamp } from '@firebase/firestore-types';
import { PageId } from './idtypes';

export interface Page extends PageId {
  content: string;
  published: boolean;
  updated: Timestamp | Date;
}
