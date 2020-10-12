import { AttributeName } from './attribute';

export interface BaseCalculation {
  type: 'concrete' | 'calculated';
}

export interface ConcreteCalculation extends BaseCalculation {
  type: 'concrete';
  cost: number;
}

export interface CalculatedCalculation extends BaseCalculation {
  type: 'calculated';
  cost: string[];
}

export type Calculation = CalculatedCalculation | ConcreteCalculation;

export type CostType = 'pool' | 'initiative' | 'damage' | 'depletion';

export interface BaseCost {
  type: CostType;
}

export interface PoolCost extends BaseCost {
  type: 'pool';
  pool: AttributeName[];
  cost: Calculation;
}

export interface InitiativeCost extends BaseCost {
  type: 'initiative';
  cost: Calculation;
}

export interface DamageCost extends BaseCost {
  type: 'damage';
  cost: Calculation;
  what: { type: string; category: string };
}

export interface DepletionCost extends BaseCost {
  type: 'depletion';
  target: number;
  level: number;
}

export type CalculatedCost = PoolCost | InitiativeCost | DamageCost;
export type ConcreteCost =
  | (CalculatedCost & { cost: ConcreteCalculation })
  | DepletionCost;
export type Cost = PoolCost | InitiativeCost | DamageCost | DepletionCost;
