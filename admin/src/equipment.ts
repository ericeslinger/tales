import { Action } from '../../types/action';
import { Item } from '../../types/item';

function weapon({
  name,
  initiative,
  size,
  damage,
  skills,
}: {
  name: string;
  initiative: number;
  size: number;
  damage: number;
  skills: string[];
}): Item {
  return {
    name,
    description: `A ${name}`,
    slot: 'hand',
    size,
    abilities: [
      {
        type: 'activate',
        name: 'Attack',
        description: `Basic attack with a ${name}.`,
        category: 'attack',
        skills,
        costs: [
          { type: 'initiative', cost: { type: 'concrete', cost: initiative } },
        ],
        effects: [
          {
            type: 'bonus',
            damage: damage,
            duration: 'roll',
          },
        ],
      },
    ],
  };
}

export const rapier = weapon({
  name: 'Rapier',
  initiative: 4,
  damage: 2,
  size: 1,
  skills: ['fencing', 'combatinsight'],
});

export const magicRapier: Item = {
  ...rapier,
  abilities: [
    ...rapier.abilities,
    {
      type: 'activate',
      name: 'Attack',
      description: 'Magical strike against a chaotic foe.',
      category: 'attack',
      skills: ['fencing', 'combatinsight'],
      costs: [
        { type: 'initiative', cost: { type: 'concrete', cost: 4 } },
        { type: 'depletion', level: 0, target: 4 },
      ],
      effects: [
        {
          type: 'bonus',
          damage: 2,
          assets: 1,
          duration: 'roll',
        },
      ],
    },
  ],
};

export const dagger = weapon({
  name: 'Dagger',
  initiative: 3,
  damage: 0,
  size: 1,
  skills: ['fencing', 'combatinsight', 'sniper', 'quickdraw'],
});

export const lightMace = weapon({
  name: 'Light Mace',
  initiative: 4,
  damage: 2,
  size: 1,
  skills: ['fencing', 'combatinsight'],
});

export const staff = weapon({
  name: 'Staff',
  initiative: 6,
  damage: 4,
  size: 2,
  skills: ['fencing', 'combatinsight'],
});

export const crossbow = weapon({
  name: 'Crossbow',
  initiative: 8,
  damage: 5,
  size: 2,
  skills: ['sniper', 'quickdraw'],
});

export const magicCrossbow: Item = {
  ...crossbow,
  name: 'Blood Crossbow',
  depleted: false,
  abilities: [
    ...crossbow.abilities,
    {
      type: 'activate',
      name: 'Imbue with Blood',
      description:
        'You pour a little bit of your soul into the crossbow. It appreciates the donation.',
      costs: [
        { type: 'depletion', level: 0, target: 4 },
        { type: 'pool', pool: ['health'], cost: { type: 'concrete', cost: 1 } },
      ],
      effects: [
        {
          duration: 'next',
          type: 'bonus',
          damage: 10,
        },
      ],
      category: 'attack',
    },
  ],
};

export const longbow = weapon({
  name: 'Crossbow',
  initiative: 6,
  damage: 3,
  size: 2,
  skills: ['hurling', 'righteousfury'],
});

export const stoneCloak: Item = {
  name: 'Stone Cloak',
  description:
    'A cloak the same color and consistency of old stone, it provides additional defense as well as camouflage.',
  slot: 'body',
  size: 1,
  depleted: false,
  abilities: [
    {
      type: 'automatic',
      name: 'Defensive Assist',
      description:
        'The stone cloak swirls of its own accord, confounding your foe',
      category: 'defense',
      effects: [
        {
          type: 'bonus',
          assets: 1,
          duration: 'roll',
        },
      ],
      costs: [{ type: 'depletion', target: 3, level: 0 }],
    },
    {
      type: 'automatic',
      name: 'Defensive Assist',
      description: 'The stone cloak helps you hide.',
      category: 'noncombat',
      skills: ['sneaking'],
      effects: [
        {
          type: 'bonus',
          assets: 1,
          duration: 'roll',
        },
      ],
      costs: [{ type: 'depletion', target: 3, level: 0 }],
    },
  ],
};

export const shield: Item = {
  name: 'Shield',
  description: 'A simple shield.',
  slot: 'hand',
  size: 1,
  abilities: [
    {
      type: 'automatic',
      name: 'Shield Bonus',
      description: 'You use your shield to aid your defense',
      category: 'defense',
      effects: [
        {
          type: 'bonus',
          edge: 1,
          duration: 'roll',
        },
      ],
      costs: [],
    },
    {
      type: 'automatic',
      name: 'Shield Nonproficency Penalty',
      description: 'Your shield hinders your attack',
      category: 'attack',
      effects: [
        {
          type: 'bonus',
          assets: -1,
          duration: 'roll',
        },
      ],
      costs: [],
    },
  ],
};

export const feet: Action = {
  name: 'Unarmed Strike',
  type: 'activate',
  costs: [{ type: 'initiative', cost: { type: 'concrete', cost: 3 } }],
  effects: [
    {
      type: 'bonus',
      damage: 2,
      duration: 'roll',
    },
  ],
  category: 'attack',
  skills: ['unarmedcombat'],
  description: 'With fists and feet of fury, pummel your foes.',
};
