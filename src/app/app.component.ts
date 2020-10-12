import { NavigationStart, Router } from '@angular/router';

import { Component } from '@angular/core';
import { PresenceService } from './core/firebase/presence.service';
import { TitleService } from './shared/topline/title.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Framesystem';
  constructor(
    private presence: PresenceService,
    private router: Router,
    private titleService: TitleService
  ) {
    this.router.events
      .pipe(filter((ev) => ev instanceof NavigationStart))
      .subscribe(() => this.titleService.setTitle('Framesystem Roleplaying'));
  }
}
