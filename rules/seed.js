const fs = require('fs');
const path = require('path');
const admin = require('firebase-admin');

async function seed() {
  const basic = fs.readFileSync(path.join(__dirname, 'basic.md'), 'utf-8');

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

  await app
    .firestore()
    .doc('/pages/rules')
    .set({
      authors: [flagArgs.gm],
    });

  await app.firestore().doc('/pages/rules/pages/basic').set({
    published: true,
    sequence: 1,
    updated: new Date(),
    pageId: 'basic',
    collectionId: 'rules',
    content: basic.toString(),
  });
}
try {
  seed();
} catch (e) {
  console.log(e);
}
