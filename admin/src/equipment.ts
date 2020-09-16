import { Equipment } from '../../types/equipment';

export const rapier: Equipment = {
  type: 'weapon',
  kind: 'melee',
  slot: 'hand',
  size: 1,
  damage: 2,
  initiative: 4,
  effect: {},
  name: 'Rapier',
  equipped: true,
  skills: ['fencing', 'combatinsight'],
};

export const dagger: Equipment = {
  type: 'weapon',
  kind: 'melee',
  slot: 'hand',
  size: 1,
  damage: 0,
  initiative: 3,
  effect: {},
  name: 'Dagger',
  equipped: true,
  skills: ['fencing', 'combatinsight'],
};

export const lightMace: Equipment = {
  type: 'weapon',
  kind: 'melee',
  slot: 'hand',
  size: 1,
  damage: 2,
  initiative: 4,
  effect: {},
  name: 'Light Mace',
  equipped: true,
  skills: ['fencing', 'combatinsight'],
};

export const staff: Equipment = {
  type: 'weapon',
  kind: 'melee',
  slot: 'hand',
  size: 2,
  damage: 4,
  initiative: 6,
  effect: {},
  name: 'Staff',
  equipped: true,
  skills: ['fencing', 'combatinsight'],
};

export const antimagicBlast: Equipment = {
  type: 'weapon',
  kind: 'ranged',
  slot: 'hand',
  size: 2,
  damage: -10,
  initiative: 6,
  effect: {},
  name: 'Antimagic Staff',
  equipped: true,
  skills: ['sniper', 'quickdraw'],
};

export const sonicBlast: Equipment = {
  type: 'weapon',
  kind: 'ranged',
  slot: 'hand',
  size: 1,
  damage: 4,
  initiative: 4,
  effect: {},
  name: 'Sonic Blast',
  equipped: true,
  skills: ['sniper', 'quickdraw'],
};

export const magicRapier: Equipment = {
  type: 'weapon',
  kind: 'melee',
  slot: 'hand',
  size: 1,
  damage: 2,
  initiative: 4,
  effect: { assets: [{ category: 'attack', value: 1 }] },
  name: 'Magical Rapier',
  equipped: true,
  skills: ['fencing', 'combatinsight'],
};

export const crossbow: Equipment = {
  type: 'weapon',
  kind: 'ranged',
  slot: 'hand',
  size: 2,
  damage: 5,
  initiative: 8,
  effect: {},
  name: 'Crossbow',
  equipped: true,
  skills: ['sniper', 'quickdraw'],
};

export const longbow: Equipment = {
  type: 'weapon',
  kind: 'ranged',
  slot: 'hand',
  size: 2,
  damage: 3,
  initiative: 6,
  effect: {},
  name: 'Longbow',
  equipped: true,
  skills: ['hurling', 'righteousfury'],
};

export const feet: Equipment = {
  type: 'weapon',
  kind: 'melee',
  slot: 'body',
  damage: 1,
  initiative: 3,
  effect: {},
  name: 'Unarmed Attack',
  equipped: true,
  size: 1,
  skills: ['unarmedfighting'],
};

export const stoneCloak: Equipment = {
  type: 'armor',
  slot: 'body',
  size: 1,
  effect: { assets: [{ category: 'defense', value: 1 }] },
  equipped: true,
  name: 'Stone Cloak',
};

export const shield: Equipment = {
  type: 'armor',
  slot: 'body',
  size: 1,
  effect: { edge: [{ category: 'defense', value: 1 }] },
  equipped: true,
  name: 'Shield',
};

export const nonproficiencyPenalty: Equipment = {
  type: 'other',
  name: 'Shield Nonproficiency Penalty',
  equipped: true,
  size: 0,
  slot: 'body',
  effect: { assets: [{ category: 'attack', value: -1 }] },
};

export const rapidStrike: Equipment = {
  type: 'other',
  name: 'Rapid Strike',
  equipped: true,
  size: 0,
  slot: 'body',
  effect: { initiative: -1, edge: [{ category: 'attack', value: 0 }] },
};
