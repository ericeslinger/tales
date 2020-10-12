import { CommonModule } from '@angular/common';
import { ImageSelectComponent } from './image-select/image-select.component';
import { MaterialModule } from '../core/material/material.module';
import { NgModule } from '@angular/core';
import { NgxFileDropModule } from 'ngx-file-drop';
import { PersonImageComponent } from './person-image/person-image.component';
import { RouterModule } from '@angular/router';
import { SpinnerComponent } from './spinner.component';
import { ToplineComponent } from './topline/topline.component';

@NgModule({
  declarations: [
    SpinnerComponent,
    ImageSelectComponent,
    ToplineComponent,
    PersonImageComponent,
  ],
  imports: [CommonModule, MaterialModule, NgxFileDropModule, RouterModule],
  exports: [
    SpinnerComponent,
    ImageSelectComponent,
    ToplineComponent,
    PersonImageComponent,
  ],
})
export class SharedModule {}
