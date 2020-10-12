import * as firebase from 'firebase/app';

import { NavigationEnd, Router } from '@angular/router';
import { combineLatest, of } from 'rxjs';
import {
  distinctUntilChanged,
  filter,
  map,
  startWith,
  switchMap,
} from 'rxjs/operators';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PresenceService {
  constructor(
    private db: AngularFireDatabase,
    private auth: AngularFireAuth,
    private router: Router
  ) {
    this.init();
  }

  getPresence(uid: string) {
    return this.db.object(`status/${uid}`).valueChanges();
  }

  async setPresence(status: string, uid: string) {
    return await this.db
      .object(`status/${uid}`)
      .update({ status, timestamp: firebase.database.ServerValue.TIMESTAMP });
  }

  private init() {
    const onlineState = this.auth.authState.pipe().pipe(
      switchMap((user) => {
        if (user) {
          return this.db
            .object('.info/connected')
            .valueChanges()
            .pipe(map((connected) => (connected ? 'online' : 'offline')));
        } else {
          return of('offline');
        }
      })
    );

    this.auth.authState.subscribe((user) => {
      if (user) {
        this.db.object(`status/${user.uid}`).query.ref.onDisconnect().update({
          status: 'offline',
          timestamp: firebase.database.ServerValue.TIMESTAMP,
        });
      }
    });

    combineLatest([
      onlineState,
      this.auth.user,
      this.router.events.pipe(
        filter((ev) => ev instanceof NavigationEnd),
        map((ev: NavigationEnd) => ev.urlAfterRedirects),
        startWith('/')
      ),
    ]).subscribe(([online, { uid }, url]) => {
      this.setPresence(online === 'online' ? url : 'offline', uid);
    });
  }

  getPresences() {
    return this.db
      .object('status')
      .valueChanges()
      .pipe(
        map((v) =>
          Object.fromEntries(
            Object.entries(v)
              .filter(([, { status }]) => status !== 'offline')
              .map(([uid, { status }]) => [uid, status])
          )
        ),
        distinctUntilChanged(recordsEqual)
      );
  }
}

function recordsEqual(
  a: Record<string, string>,
  b: Record<string, string>
): boolean {
  if (Object.keys(a).length !== Object.keys(b).length) {
    return false;
  }
  return Object.keys(a).every((key) => a[key] === b[key]);
}
