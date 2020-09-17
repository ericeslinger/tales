import { campaign, characters } from './fantasyFights.js';
import admin from 'firebase-admin';
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
        databaseURL: 'https://tales-280319.firebaseio.com',
        projectId: 'tales-280319',
    });
    const acl = { [flagArgs.gm]: 'gm' };
    if (flagArgs.player) {
        acl[flagArgs.player] = 'player';
    }
    const ffc = await app
        .firestore()
        .collection(`/campaigns`)
        .add({ ...campaign, acl });
    await Promise.all([
        Promise.all(characters
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
