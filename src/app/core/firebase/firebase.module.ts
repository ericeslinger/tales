import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { CommonModule } from '@angular/common';
import { FIREBASE_OPTIONS } from '@angular/fire';
import { NgModule } from '@angular/core';
import { SETTINGS } from '@angular/fire/firestore';
import { environment } from '../../../environments/environment';

@NgModule({
  declarations: [],
  providers: [
    {
      provide: SETTINGS,
      useValue: environment.production
        ? undefined
        : {
            host: 'localhost:8080',
            ssl: false,
          },
    },
    {
      provide: FIREBASE_OPTIONS,
      useValue: environment.production
        ? undefined
        : {
            databaseURL: 'http://localhost:9000?ns=framesystem-rpg',
            apiKey: 'AIzaSyDUOWopxmEK8n3r4wSOXzKsZJg_78D_OF8',
            authDomain: 'framesystem-rpg.firebaseapp.com',
            projectId: 'framesystem-rpg',
            storageBucket: 'framesystem-rpg.appspot.com',
            messagingSenderId: '414765217858',
            appId: '1:414765217858:web:0575368df99009430295db',
          },
    },
  ],
  imports: [
    AngularFireAuthModule,
    AngularFireModule.initializeApp({
      apiKey: 'AIzaSyDUOWopxmEK8n3r4wSOXzKsZJg_78D_OF8',
      authDomain: 'framesystem-rpg.firebaseapp.com',
      databaseURL: 'https://framesystem-rpg.firebaseio.com',
      projectId: 'framesystem-rpg',
      storageBucket: 'framesystem-rpg.appspot.com',
      messagingSenderId: '414765217858',
      appId: '1:414765217858:web:0575368df99009430295db',
    }),
    AngularFireStorageModule,
    CommonModule,
  ],
})
export class FirebaseModule {}
