import { Injectable, NgModule } from '@angular/core';
import { MarkdownModule, MarkedOptions } from 'ngx-markdown';

import { CommonModule } from '@angular/common';
import { EditComponent } from './edit/edit.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { RulesComponent } from './static/rules.component';
import { ViewComponent } from './view/view.component';

@NgModule({
  declarations: [ViewComponent, EditComponent, RulesComponent],
  imports: [
    CommonModule,
    MarkdownModule.forChild(),
    MatSidenavModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
  ],
})
export class PagesModule {}
