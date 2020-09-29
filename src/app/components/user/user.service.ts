import { filter, map, switchMap, take, tap } from 'rxjs/operators';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../../../types/user';
import { firestore } from 'firebase';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private firestore: AngularFirestore,
    private auth: AngularFireAuth,
    private router: Router
  ) {}

  list() {
    return this.firestore
      .collection<User>('users')
      .valueChanges({ idField: 'id' });
  }

  get(id: String) {
    return this.firestore
      .doc<User>(`/users/${id}`)
      .snapshotChanges()
      .pipe(map((v) => ({ id: v.payload.id, ...v.payload.data() } as User)));
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
      .valueChanges({ idField: 'id' });
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
    this.router.navigate(['welcome']);
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
        premium: false,
      });
    }
  }
}