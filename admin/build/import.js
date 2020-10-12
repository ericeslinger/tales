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
const fs = __importStar(require("fs"));
(async () => {
    const app = admin.initializeApp({
        credential: admin.credential.applicationDefault(),
        databaseURL: 'https://framesystem-rpg.firebaseio.com',
        projectId: 'framesystem-rpg',
    });
    const data = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
    await Promise.all(Object.entries(data.pages).map(async ([id, page]) => {
        await app
            .firestore()
            .doc(`/pages/${id}`)
            .set(restoreDate(page.meta));
        await Promise.all(page.content.map((child) => app
            .firestore()
            .doc(`/pages/${id}/pages/${child.id}`)
            .set(restoreDate(child))));
    }));
    await Promise.all(Object.entries(data.campaigns).map(async ([id, campaign]) => {
        await app
            .firestore()
            .doc(`/campaigns/${id}`)
            .set(restoreDate(campaign.campaign));
        await Promise.all(campaign.characters.map((character) => app
            .firestore()
            .doc(`/campaigns/${id}/characters/${character.characterId}`)
            .set(restoreDate(character))));
    }));
    await Promise.all(Object.entries(data.users).map(async ([id, user]) => {
        await app
            .firestore()
            .doc(`/users/${id}`)
            .set(restoreDate(user.user));
        await Promise.all(user.media.map((media) => app
            .firestore()
            .doc(`/users/${id}/media/${media.mediaId}`)
            .set(restoreDate(media))));
    }));
})();
function restoreDate(obj) {
    return Object.fromEntries(Object.entries(obj).map(([key, val]) => val._seconds > 0
        ? [key, new admin.firestore.Timestamp(val._seconds, val._nanoseconds)]
        : [key, val]));
}
