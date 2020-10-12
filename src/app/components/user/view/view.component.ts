import { BehaviorSubject, Observable, Subject, combineLatest, of } from 'rxjs';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { filter, map, takeUntil, tap, withLatestFrom } from 'rxjs/operators';

import { AngularFireAuth } from '@angular/fire/auth';
import { ImageSelectService } from 'src/app/shared/image-select.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'types/user';
import { UserService } from '../user.service';

interface Action {
  type: 'name' | 'avatar' | 'rollPreference';
  payload: string;
}

@Component({
  selector: 'framesystem-user-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
})
export class ViewComponent implements OnInit, OnDestroy {
  destroying_ = new BehaviorSubject<boolean>(false);
  destroying = this.destroying_.asObservable().pipe(filter((v) => v));
  actions_ = new Subject<Action>();

  editing = {
    name: false,
    avatar: false,
    rollPreference: false,
  };

  @Input('user') user: Observable<User>;
  name: Observable<string>;
  avatar: Observable<string>;
  rollPreference: Observable<string>;
  canEdit: Observable<boolean>;
  unverified: Observable<boolean>;

  constructor(
    private auth: AngularFireAuth,
    private userService: UserService,
    private imageSelect: ImageSelectService,
    private snackbar: MatSnackBar
  ) {}

  ngOnDestroy() {
    this.destroying_.next(true);
  }

  ngOnInit(): void {
    this.name = this.user.pipe(map((u) => u.name));
    this.avatar = this.user.pipe(map((u) => u.avatar));
    this.rollPreference = this.user.pipe(map((u) => u.rollPreference));
    this.canEdit = combineLatest([
      this.userService.hasPrivilege('admin'),
      this.auth.user,
      this.user,
    ]).pipe(map(([admin, { uid }, { userId }]) => admin || uid === userId));

    this.unverified = this.user.pipe(
      withLatestFrom(this.auth.user),
      tap((v) => console.log(v)),
      map(([lookingAt, me]) =>
        lookingAt.userId === me.uid ? !me.emailVerified : false
      )
    );

    this.actions_
      .asObservable()
      .pipe(withLatestFrom(this.user), takeUntil(this.destroying))
      .subscribe(([action, user]) => {
        this.userService.update(user.userId, { [action.type]: action.payload });
      });
  }

  update(action: Action) {
    this.actions_.next(action);
    this.readonly();
  }

  async sendVerification() {
    const u = await this.auth.currentUser;
    u.sendEmailVerification();
    this.snackbar.open('Email Sent');
    this.unverified = of(false);
  }

  async updateAvatar() {
    const avatar = await this.imageSelect.selectImage();
    if (avatar) {
      this.actions_.next({ type: 'avatar', payload: avatar });
    }
  }

  readonly() {
    this.editing.name = false;
    this.editing.avatar = false;
    this.editing.rollPreference = false;
  }
}
