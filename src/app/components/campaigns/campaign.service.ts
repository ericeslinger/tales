import { AclType } from 'types/acl';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Campaign } from 'types/campaign';
import { CampaignId } from 'types/idtypes';
import { Injectable } from '@angular/core';
import { addId } from '../../data/rxutil';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CampaignService {
  constructor(
    private firestore: AngularFirestore,
    private auth: AngularFireAuth
  ) {}

  list(acls: AclType[] = ['player', 'gm', 'viewer']) {
    return this.auth.user.pipe(
      switchMap((user) =>
        this.firestore
          .collection<Campaign>('campaigns', (ref) =>
            ref.where(`acl.${user.uid}`, 'in', acls)
          )
          .valueChanges({ idField: 'campaignId' })
      )
    );
  }

  get(id: CampaignId) {
    return this.firestore
      .doc<Campaign>(`/campaigns/${id.campaignId}`)
      .snapshotChanges()
      .pipe(addId('campaignId'));
  }

  update(id: CampaignId, patch: Partial<Campaign>) {
    return this.firestore.doc(`/campaigns/${id.campaignId}`).update(patch);
  }
}
