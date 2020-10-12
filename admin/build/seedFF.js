"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const admin = __importStar(require("firebase-admin"));
const fantasyFights_1 = require("./fantasyFights");
(async () => {
    const flagArgs = {};
    const args = process.argv.slice(2);
    for (let i = 0; i < args.length; i = i + 2) {
        flagArgs[args[i].slice(2)] = args[i + 1];
    }
    if (!flagArgs.gm) {
        throw new TypeError('required argument --gm uid');
    }
    const app = admin.initializeApp({
        credential: admin.credential.applicationDefault(),
        databaseURL: 'https://framesystem-rpg.firebaseio.com',
        projectId: 'framesystem-rpg',
    });
    const acl = { [flagArgs.gm]: 'gm' };
    if (flagArgs.player) {
        acl[flagArgs.player] = 'player';
    }
    const ffc = await app
        .firestore()
        .collection(`/campaigns`)
        .add({ ...fantasyFights_1.campaign, acl });
    await app
        .firestore()
        .doc('/pages/rules')
        .set({
        authors: [flagArgs.gm],
    });
    await Promise.all([
        Promise.all(fantasyFights_1.characters
            .map((c) => {
            if (flagArgs.player) {
                return { ...c, acl };
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
