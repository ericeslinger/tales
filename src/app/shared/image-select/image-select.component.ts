import {
  AngularFireStorage,
  AngularFireUploadTask,
} from '@angular/fire/storage';
import { BehaviorSubject, Observable, Subject, combineLatest } from 'rxjs';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FileSystemFileEntry, NgxFileDropEntry } from 'ngx-file-drop';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  distinctUntilKeyChanged,
  filter,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs/operators';

import { AngularFireAuth } from '@angular/fire/auth';
import { UserMedia } from 'types/user';
import { UserService } from '../../components/user/user.service';
import { ulid } from 'ulid';

@Component({
  selector: 'framesystem-image-select',
  templateUrl: './image-select.component.html',
  styleUrls: ['./image-select.component.scss'],
})
export class ImageSelectComponent implements OnInit, OnDestroy {
  destroying_ = new BehaviorSubject<boolean>(false);
  destroying = this.destroying_.asObservable().pipe(filter((v) => v));

  userMedia: Observable<UserMedia[]>;

  fileSubject = new Subject<File>();
  file = this.fileSubject.asObservable();
  showProgress = false;

  uploadSubject = new Subject<AngularFireUploadTask>();
  uploadProgress = this.uploadSubject.asObservable().pipe(
    switchMap((task) => task.percentageChanges()),
    tap((v) => console.log(v))
  );
  dropFile: NgxFileDropEntry;

  constructor(
    public matDialogRef: MatDialogRef<ImageSelectComponent, string>,
    private userService: UserService,
    private storage: AngularFireStorage,
    private authService: AngularFireAuth
  ) {}

  ngOnInit(): void {
    this.userMedia = this.authService.user.pipe(
      switchMap(({ uid }) =>
        this.userService.listMedia({ type: 'user', userId: uid })
      ),
      tap((v) => console.log(v))
    );
    combineLatest([this.file, this.authService.user])
      .pipe(
        distinctUntilKeyChanged(0),
        filter(([, { uid }]) => !!uid && uid.length > 0),
        takeUntil(this.destroying)
      )
      .subscribe(([file, { uid }]) => {
        const id = ulid();
        const ref = this.storage.ref(id);
        const task = ref.put(file);
        task.then(async (result) =>
          this.userService.addMedia({
            userId: uid,
            type: 'media',
            mediaId: id,
            date: new Date(),
            public: true,
            url: await result.ref.getDownloadURL(),
          })
        );
        this.uploadSubject.next(task);
      });
  }

  ngOnDestroy() {
    this.destroying_.next(true);
  }

  select(url: string) {
    this.matDialogRef.close(url);
  }

  dropped([file]: NgxFileDropEntry[]) {
    console.log(file);
    if (file?.fileEntry?.isFile) {
      (file.fileEntry as FileSystemFileEntry).file((file) =>
        this.initiateUpload(file)
      );
    }
  }

  async initiateUpload(file: File) {
    this.fileSubject.next(file);
  }

  upload(event) {
    console.log(event);
    this.initiateUpload(event.target.files[0]);
  }
}
