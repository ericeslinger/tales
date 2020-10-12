"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.powers = exports.template = exports.variables = void 0;
exports.variables = {
    attribute: ['might', 'speed', 'focus', 'conviction'],
    range: ['melee', 'ranged'],
};
function template(tpl, args) {
    return tpl.replace(/\${(\w+)}/g, (_, v) => args[v]);
}
exports.template = template;
exports.powers = [
    {
        name: 'Two-Weapon Fighting',
        id: 'twoweaponfighting',
        category: 'fighting',
        keywords: ['melee', '%attribute'],
        level: 1,
        abilities: [
            {
                type: 'bonus',
                effect: [
                    {
                        inherentEdge: 1,
                        skill: '${attribute}meleeattack',
                    },
                ],
                requirements: {
                    weapons: [{ kind: 'melee' }, { kind: 'melee' }],
                },
            },
        ],
    },
    {
        name: 'Dual Strike',
        id: 'dualstrike',
        category: 'fighting',
        keywords: ['melee', 'strike', '%attribute'],
        level: 2,
        abilities: [
            {
                type: 'strike',
                multi: true,
                inherentEdge: 0,
                requirements: {
                    weapons: [{ kind: 'melee' }, { kind: 'melee' }],
                },
                attribute: '${attribute}',
                initiative: [
                    { type: 'weapon', modifier: 0 },
                    { type: 'weapon', modifier: 0 },
                ],
                damage: [
                    { type: 'weapon', modifier: 0 },
                    { type: 'weapon', modifier: 0 },
                ],
            },
        ],
    },
    {
        name: 'Debilitating Strike',
        id: 'debilitatingstrike',
        category: 'fighting',
        keywords: ['%range', 'strike', '%attribute'],
        level: 1,
        abilities: [
            {
                type: 'strike',
                multi: false,
                requirements: {
                    weapons: [{ kind: '${range}' }],
                },
                initiative: [{ type: 'weapon', modifier: 2 }],
                damage: [{ type: 'weapon', modifier: 0 }],
                cost: [{ attribute: '${attribute}', amount: 4 }],
                description: 'A successful hit will daze opponent',
            },
        ],
    },
];
