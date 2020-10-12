import admin from 'firebase-admin';

(async () => {
  const [uid, ...claims] = process.argv.slice(2);
  const app = admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: 'https://framesystem-rpg.firebaseio.com',
    projectId: 'framesystem-rpg',
  });

  const { customClaims } = await admin.auth().getUser(uid);

  await admin.auth().setCustomUserClaims(uid, {
    ...customClaims,
    ...Object.fromEntries(claims.map((claim) => [claim, true])),
  });

  console.log('success');
})();
