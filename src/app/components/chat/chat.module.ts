import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { MarkdownModule } from 'ngx-markdown';
import { MatInputModule } from '@angular/material/input';
import { MaterialModule } from 'src/app/core/material/material.module';
import { NgModule } from '@angular/core';
import { ViewComponent } from './view/view.component';
import { WriteComponent } from './write/write.component';

@NgModule({
  declarations: [WriteComponent, ViewComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    MarkdownModule.forChild(),
  ],
  exports: [WriteComponent, ViewComponent],
})
export class ChatModule {}
