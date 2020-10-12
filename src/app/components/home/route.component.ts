import { Component, OnInit } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { map, publishReplay, refCount } from 'rxjs/operators';

import { AngularFireAuth } from '@angular/fire/auth';
import { Campaign } from 'types/campaign';
import { CampaignService } from 'src/app/components/campaigns/campaign.service';

@Component({
  selector: 'tales-home-route',
  templateUrl: './route.component.html',
  styleUrls: ['./route.component.scss'],
})
export class RouteComponent implements OnInit {
  presentation: Observable<{ userId: string; campaigns: Campaign[] }>;

  constructor(
    private auth: AngularFireAuth,
    private campaignService: CampaignService
  ) {}

  ngOnInit(): void {
    this.presentation = combineLatest([
      this.auth.user.pipe(map((user) => user.uid)),
      this.campaignService.list(['player', 'gm', 'viewer']),
    ]).pipe(
      map(([userId, campaigns]) => ({ userId, campaigns })),
      publishReplay(1),
      refCount()
    );
  }
}
