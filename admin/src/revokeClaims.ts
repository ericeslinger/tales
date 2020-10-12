import admin from 'firebase-admin';

(async () => {
  const [uid, ...claims] = process.argv.slice(2);
  const app = admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: 'https://framesystem-rpg.firebaseio.com',
    projectId: 'framesystem-rpg',
  });

  await admin
    .auth()
    .setCustomUserClaims(
      uid,
      Object.fromEntries(claims.map((claim) => [claim, false]))
    )
    .then((v) => console.log(v))
    .catch((e) => {
      console.log('ERROR');
      console.log(e);
    });
})();
