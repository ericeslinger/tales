import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  filter,
  map,
  publishReplay,
  refCount,
  startWith,
  switchMap,
} from 'rxjs/operators';

import { AngularFireAuth } from '@angular/fire/auth';
import { Campaign } from 'types/campaign';
import { CampaignService } from 'src/app/components/campaigns/campaign.service';
import { LoginComponent } from 'src/app/components/user/login.component';
import { MatDialog } from '@angular/material/dialog';
import { TitleService } from './title.service';
import { User } from 'types/user';
import { UserService } from 'src/app/components/user/user.service';

@Component({
  selector: 'framesystem-topline',
  templateUrl: './topline.component.html',
  styleUrls: ['./topline.component.scss'],
})
export class ToplineComponent implements OnInit {
  loggedIn: Observable<boolean>;
  user: Observable<User>;
  notifications: Observable<string[]>;
  campaigns: Observable<Campaign[]>;
  title: Observable<string>;

  constructor(
    private auth: AngularFireAuth,
    private userService: UserService,
    private campaignService: CampaignService,
    private dialogService: MatDialog,
    private titleService: TitleService
  ) {}

  ngOnInit(): void {
    this.user = this.auth.user.pipe(
      switchMap((u) => (!!u ? this.userService.get(u.uid) : of(null))),
      publishReplay(1),
      refCount()
    );
    this.loggedIn = this.user.pipe(map((u) => u !== null));
    this.notifications = of([]);
    this.campaigns = this.campaignService
      .list()
      .pipe(publishReplay(1), refCount());
    this.title = this.titleService.title.pipe(
      startWith('Framesystem Roleplaying')
    );
  }

  async logout() {
    await this.userService.logout();
  }

  async login() {
    this.dialogService.open(LoginComponent);
  }
}
