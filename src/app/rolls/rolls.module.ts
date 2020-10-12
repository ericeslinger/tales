import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { MaterialModule } from '../core/material/material.module';
import { NgModule } from '@angular/core';
import { PipesModule } from '../core/pipes/pipes.module';
import { RequestComponent } from './request/request.component';
import { ResolveComponent } from './resolve/resolve.component';
import { ResultComponent } from './result/result.component';

@NgModule({
  declarations: [RequestComponent, ResolveComponent, ResultComponent],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    PipesModule,
  ],
  exports: [ResultComponent],
})
export class RollsModule {}
