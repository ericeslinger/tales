"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rapidStrike = exports.nonproficiencyPenalty = exports.shield = exports.stoneCloak = exports.feet = exports.longbow = exports.crossbow = exports.magicRapier = exports.sonicBlast = exports.antimagicBlast = exports.staff = exports.lightMace = exports.dagger = exports.rapier = void 0;
exports.rapier = {
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
exports.dagger = {
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
exports.lightMace = {
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
exports.staff = {
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
exports.antimagicBlast = {
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
exports.sonicBlast = {
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
exports.magicRapier = {
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
exports.crossbow = {
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
exports.longbow = {
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
exports.feet = {
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
exports.stoneCloak = {
    type: 'armor',
    slot: 'body',
    size: 1,
    effect: { assets: [{ category: 'defense', value: 1 }] },
    equipped: true,
    name: 'Stone Cloak',
};
exports.shield = {
    type: 'armor',
    slot: 'body',
    size: 1,
    effect: { edge: [{ category: 'defense', value: 1 }] },
    equipped: true,
    name: 'Shield',
};
exports.nonproficiencyPenalty = {
    type: 'other',
    name: 'Shield Nonproficiency Penalty',
    equipped: true,
    size: 0,
    slot: 'body',
    effect: { assets: [{ category: 'attack', value: -1 }] },
};
exports.rapidStrike = {
    type: 'other',
    name: 'Rapid Strike',
    equipped: true,
    size: 0,
    slot: 'body',
    effect: { initiative: -1, edge: [{ category: 'attack', value: 0 }] },
};
