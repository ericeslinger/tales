"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_admin_1 = __importDefault(require("firebase-admin"));
(async () => {
    const [uid, ...claims] = process.argv.slice(2);
    const app = firebase_admin_1.default.initializeApp({
        credential: firebase_admin_1.default.credential.applicationDefault(),
        databaseURL: 'https://framesystem-rpg.firebaseio.com',
        projectId: 'framesystem-rpg',
    });
    await firebase_admin_1.default
        .auth()
        .setCustomUserClaims(uid, Object.fromEntries(claims.map((claim) => [claim, false])))
        .then((v) => console.log(v))
        .catch((e) => {
        console.log('ERROR');
        console.log(e);
    });
})();
