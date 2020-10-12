import { Action } from './action';

export interface Item {
  name: string;
  description: string;
  slot: 'body' | 'hand' | 'head';
  size: number;
  abilities: Action[];
  depleted?: boolean;
}
