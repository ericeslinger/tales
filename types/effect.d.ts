export type AuraDuration = 'scene' | 'day' | 'next' | number;

export interface BaseEffect {
  type: 'bonus' | 'generic';
  duration: 'roll' | AuraDuration;
  name?: string;
  description?: string;
  icon?: string;
}

export interface BonusEffect extends BaseEffect {
  type: 'bonus';
  assets?: number;
  edge?: number;
  initiative?: number;
  damage?: number;
}

export interface GenericEffect extends BaseEffect {
  type: 'generic';
}

export type Effect = BonusEffect | GenericEffect;
