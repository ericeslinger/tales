import * as admin from 'firebase-admin';
(async () => {
  const app = admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    // databaseURL: 'https://framesystem-rpg.firebaseio.com',
    // projectId: 'framesystem-rpg',
  });

  const pages = await app.firestore().collection('/pages').get();
  const pageCollections = await Promise.all(
    pages.docs.map((pageCollection) =>
      app.firestore().collection(`/pages/${pageCollection.id}/pages`).get()
    )
  );
  const allDocs: any = {};
  for (let i = 0; i < pages.docs.length; i++) {
    allDocs[pages.docs[i].id] = {
      meta: pages.docs[i].data(),
      content: pageCollections[i].docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })),
    };
  }

  const allCampaigns = await app.firestore().collection('/campaigns').get();
  const characters = await Promise.all(
    allCampaigns.docs.map((campaign) =>
      app.firestore().collection(`/campaigns/${campaign.id}/characters`).get()
    )
  );
  const campaigns: any = {};
  for (let i = 0; i < allCampaigns.docs.length; i++) {
    campaigns[allCampaigns.docs[i].id] = {
      campaign: {
        campaignId: allCampaigns.docs[i].id,
        ...allCampaigns.docs[i].data(),
      },
      characters: characters[i].docs.map((doc) => ({
        characterId: doc.id,
        campaignId: allCampaigns.docs[i].id,
        ...doc.data(),
      })),
    };
  }
  console.log(JSON.stringify({ pages: allDocs, campaigns }, null, 2));
})();
