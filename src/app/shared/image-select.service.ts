import { ImageSelectComponent } from './image-select/image-select.component';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ImageSelectService {
  constructor(private dialogService: MatDialog) {}

  selectImage(): Promise<string> {
    return this.dialogService
      .open(ImageSelectComponent)
      .afterClosed()
      .pipe(take(1))
      .toPromise();
  }
}
