import { ActivatedRoute, ParamMap } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { publishReplay, refCount, switchMap } from 'rxjs/operators';

import { Observable } from 'rxjs';
import { User } from 'types/user';
import { UserService } from '../user.service';

@Component({
  selector: 'framesystem-user-view-route',
  template: `<framesystem-user-view [user]="user"></framesystem-user-view>`,
  styles: [],
})
export class RouteComponent implements OnInit {
  user: Observable<User>;

  constructor(private route: ActivatedRoute, private userService: UserService) {
    this.user = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        params.get('userId')?.length > 0
          ? this.userService.get(params.get('userId'))
          : this.userService.get()
      ),
      publishReplay(1),
      refCount()
    );
  }

  ngOnInit(): void {}
}
