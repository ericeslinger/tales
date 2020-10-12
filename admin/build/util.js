"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.skillBlock = exports.attr = void 0;
function attr(v, e, n) {
    return {
        name: n,
        edge: e,
        current: v,
        pool: v,
        wound: false,
    };
}
exports.attr = attr;
function skillBlock(base, { inept, proficient, trained, expert }) {
    return base.map((skill) => {
        if (inept.includes(skill.skillId)) {
            return { ...skill, level: 'inept' };
        }
        else if (proficient.includes(skill.skillId)) {
            return { ...skill, level: 'proficient' };
        }
        else if (trained.includes(skill.skillId)) {
            return { ...skill, level: 'trained' };
        }
        else if (expert.includes(skill.skillId)) {
            return { ...skill, level: 'expert' };
        }
        return { ...skill, level: 'unskilled' };
    });
}
exports.skillBlock = skillBlock;
