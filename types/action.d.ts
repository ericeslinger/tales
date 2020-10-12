import { Cost } from './cost';
import { Effect } from './effect';
import { SkillType } from './skill';

export interface Action {
  type: 'activate' | 'replace' | 'with' | 'automatic';
  effects: Effect[];
  costs: Cost[];
  name: string;
  description: string;
  category: SkillType;
  skills?: string[];
}
