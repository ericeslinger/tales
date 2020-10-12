import { Component, Input, OnInit } from '@angular/core';

import { Campaign } from 'types/campaign';
import { UserService } from '../user/user.service';

export interface Presentation {
  userId: string;
  campaigns: Campaign[];
}

@Component({
  selector: 'tales-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  @Input() presentation: Presentation;

  constructor(private userService: UserService) {}

  ngOnInit(): void {}

  logout() {
    this.userService.logout();
  }
}
