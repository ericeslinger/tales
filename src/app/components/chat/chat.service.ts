import { AngularFirestore } from '@angular/fire/firestore';
import { CampaignId } from 'types/idtypes';
import { Injectable } from '@angular/core';
import { Message } from 'types/chat';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private firestore: AngularFirestore) {}

  send(msg: Message, campaignId: CampaignId) {
    return this.firestore
      .collection(`/campaigns/${campaignId.campaignId}/chat`)
      .add(msg);
  }

  list(campaignId: CampaignId) {
    return this.firestore
      .collection<Message>(
        `/campaigns/${campaignId.campaignId}/chat`,
        (query) => query.orderBy('date', 'desc').limit(30)
      )
      .valueChanges();
  }
}
