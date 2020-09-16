import { Character } from 'types/character';
import { Equipment } from 'types/equipment';

export function selectRelevant(
  character: Character,
  category: string
): Equipment[] {
  return character.equipment
    .filter((e) => e.equipped)
    .filter(
      (e) =>
        (e.effect.assets &&
          e.effect.assets.filter((asset) => asset.category === category)
            .length > 0) ||
        (e.effect.edge &&
          e.effect.edge.filter((edge) => edge.category === category).length > 0)
    );
}

export function countCharacter(
  character: Character,
  category: string
): { assets: number; edge: number; relevant: Equipment[] } {
  const relevant = selectRelevant(character, category);
  return {
    assets: countAssets(relevant, category),
    edge: countEdge(relevant, category),
    relevant,
  };
}

export function countAssets(item: Equipment, category: string): number;
export function countAssets(items: Equipment[], category: string): number;
export function countAssets(
  x: Equipment | Equipment[],
  category: string
): number {
  const eqp: Equipment[] = Array.isArray(x) ? x : [x];
  return eqp.reduce((acc, curr) => {
    if (curr.effect.assets && curr.effect.assets.length > 0) {
      return curr.effect.assets
        .filter((effect) => effect.category === category)
        .reduce((a, c) => a + c.value, acc);
    } else {
      return acc;
    }
  }, 0);
}

export function countEdge(item: Equipment, category: string): number;
export function countEdge(items: Equipment[], category: string): number;
export function countEdge(
  x: Equipment | Equipment[],
  category: string
): number {
  const eqp: Equipment[] = Array.isArray(x) ? x : [x];
  return eqp.reduce((acc, curr) => {
    if (curr.effect.edge && curr.effect.edge.length > 0) {
      return curr.effect.edge
        .filter((effect) => effect.category === category)
        .reduce((a, c) => a + c.value, acc);
    } else {
      return acc;
    }
  }, 0);
}

export function countInitiative(character: Character): number {
  return character.equipment
    .filter((e) => e.equipped)
    .filter((e) => !!e.effect.initiative)
    .map((e) => e.effect.initiative)
    .reduce((tot, cur) => tot + cur, 0);
}
