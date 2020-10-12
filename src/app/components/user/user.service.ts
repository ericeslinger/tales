import { User, UserMedia } from '../../../../types/user';
import {
  distinctUntilChanged,
  distinctUntilKeyChanged,
  filter,
  map,
  publishReplay,
  refCount,
  startWith,
  switchMap,
  take,
  tap,
} from 'rxjs/operators';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PresenceService } from 'src/app/core/firebase/presence.service';
import { Router } from '@angular/router';
import { UserId } from 'types/idtypes';
import { firestore } from 'firebase';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private firestore: AngularFirestore,
    private auth: AngularFireAuth,
    private router: Router,
    private presenceService: PresenceService
  ) {}

  hasPrivilege(priv: string) {
    return this.auth.user.pipe(
      distinctUntilKeyChanged('uid'),
      switchMap((user) => user.getIdTokenResult()),
      map((token) => token.claims[priv] === true),
      publishReplay(1),
      refCount()
    );
  }

  userIsEmailVerified(): Observable<boolean> {
    return this.auth.user.pipe(map((user) => user.emailVerified));
  }

  list() {
    return this.firestore
      .collection<User>('users')
      .valueChanges({ idField: 'id' });
  }

  listMedia(uid: UserId): Observable<UserMedia[]> {
    console.log(`/users/${uid.userId}/media`);
    return this.firestore
      .collection<UserMedia>(`/users/${uid.userId}/media`)
      .valueChanges();
  }

  addMedia(media: UserMedia) {
    return this.firestore
      .doc(`/users/${media.userId}/media/${media.mediaId}`)
      .set(media);
  }

  get(id?: String): Observable<User> {
    if (id) {
      return this.firestore
        .doc<User>(`/users/${id}`)
        .snapshotChanges()
        .pipe(
          filter((v) => v.payload.exists),
          map((v) => ({ userId: v.payload.id, ...v.payload.data() } as User))
        );
    } else {
      return this.auth.user.pipe(
        distinctUntilKeyChanged('uid'),
        switchMap((user) => this.get(user.uid))
      );
    }
  }

  update(id: String, user: Partial<User>) {
    return this.firestore.doc(`users/${id}`).update(user);
  }

  create(id: String, user: Partial<User>) {
    return this.firestore.doc(`users/${id}`).set(user);
  }

  getAll(users: string[]) {
    return this.firestore
      .collection<User>(`/users`, (query) =>
        query.where(firestore.FieldPath.documentId(), 'in', users)
      )
      .valueChanges({ idField: 'userId' });
  }

  async setRollPreference(rollPreference: 'automatic' | 'manual' | 'ask') {
    const { uid } = await this.auth.currentUser;
    return this.firestore.doc(`/users/${uid}`).update({ rollPreference });
  }

  async getRollPreference() {
    const { uid } = await this.auth.currentUser;
    const user = await this.firestore
      .doc<User>(`/users/${uid}`)
      .get()
      .pipe(take(1))
      .toPromise();
    if (user.data()) {
      return user.data().rollPreference || 'ask';
    } else {
      return 'ask';
    }
  }

  async logout() {
    const { uid } = await this.auth.currentUser;
    this.router.navigate(['welcome']);
    await this.presenceService.setPresence('disconnected', uid);
    this.auth.signOut();
  }

  async postLogin() {
    const user = await this.auth.user.pipe(take(1)).toPromise();
    const userDoc = await this.firestore
      .doc<User>(`/users/${user.uid}`)
      .get()
      .pipe(take(1))
      .toPromise();
    if (userDoc.exists) {
      return this.update(user.uid, {
        name: user.displayName,
        email: user.email,
        userId: user.uid,
        avatar: user.photoURL,
      });
    } else {
      return this.create(user.uid, {
        name: user.displayName,
        email: user.email,
        userId: user.uid,
        rollPreference: 'ask',
        avatar: user.photoURL,
      });
    }
  }
}
