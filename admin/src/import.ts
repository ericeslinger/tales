import * as admin from 'firebase-admin';
import * as fs from 'fs';

(async () => {
  const app = admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: 'https://framesystem-rpg.firebaseio.com',
    projectId: 'framesystem-rpg',
  });

  const data = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));

  await Promise.all(
    Object.entries(data.pages).map(async ([id, page]) => {
      await app
        .firestore()
        .doc(`/pages/${id}`)
        .set(restoreDate((page as any).meta));
      await Promise.all(
        (page as any).content.map((child: any) =>
          app
            .firestore()
            .doc(`/pages/${id}/pages/${child.id}`)
            .set(restoreDate(child))
        )
      );
    })
  );

  await Promise.all(
    Object.entries(data.campaigns).map(async ([id, campaign]) => {
      await app
        .firestore()
        .doc(`/campaigns/${id}`)
        .set(restoreDate((campaign as any).campaign));
      await Promise.all(
        (campaign as any).characters.map((character: any) =>
          app
            .firestore()
            .doc(`/campaigns/${id}/characters/${character.characterId}`)
            .set(restoreDate(character))
        )
      );
    })
  );

  await Promise.all(
    Object.entries(data.users).map(async ([id, user]) => {
      await app
        .firestore()
        .doc(`/users/${id}`)
        .set(restoreDate((user as any).user));
      await Promise.all(
        (user as any).media.map((media: any) =>
          app
            .firestore()
            .doc(`/users/${id}/media/${media.mediaId}`)
            .set(restoreDate(media))
        )
      );
    })
  );
})();

function restoreDate<T>(obj: T): T {
  return Object.fromEntries(
    Object.entries(obj).map(([key, val]) =>
      val._seconds > 0
        ? [key, new admin.firestore.Timestamp(val._seconds, val._nanoseconds)]
        : [key, val]
    )
  ) as T;
}
