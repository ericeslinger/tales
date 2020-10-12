"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fantasyFights_1 = require("./fantasyFights");
const firebase_admin_1 = __importDefault(require("firebase-admin"));
(async () => {
    const flagArgs = {};
    const args = process.argv.slice(2);
    for (let i = 0; i < args.length; i = i + 2) {
        flagArgs[args[i].slice(2)] = args[i + 1];
    }
    if (!flagArgs.gm) {
        throw new TypeError('required argument --gm uid');
    }
    const app = firebase_admin_1.default.initializeApp({
        credential: firebase_admin_1.default.credential.applicationDefault(),
        databaseURL: 'https://framesystem-rpg.firebaseio.com',
        projectId: 'framesystem-rpg',
    });
    const ffc = await app
        .firestore()
        .collection(`/campaigns`)
        .add({ ...fantasyFights_1.campaign, acl: { [flagArgs.gm]: 'admin' } });
    await Promise.all([
        Promise.all(fantasyFights_1.characters
            .map((c) => {
            if (flagArgs.player) {
                return { ...c, acl: { [flagArgs.player]: 'admin' } };
            }
            else {
                return c;
            }
        })
            .map((p) => app
            .firestore()
            .collection(`/campaigns/${ffc.id}/characters`)
            .add({ ...p, campaignId: ffc.id }))),
    ]);
})();
