import admin from 'firebase-admin';

(async () => {
  const [uid] = process.argv.slice(2);
  const app = admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: 'https://framesystem-rpg.firebaseio.com',
    projectId: 'framesystem-rpg',
  });

  await admin
    .auth()
    .getUser(uid)
    .then((v) => console.log(v.customClaims))
    .catch((e) => {
      console.log('ERROR');
      console.log(e);
    });
})();
