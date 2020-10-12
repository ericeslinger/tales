import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdjustComponent } from './adjust/adjust.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../core/material/material.module';
import { NgModule } from '@angular/core';
import { PipesModule } from '../core/pipes/pipes.module';
import { SharedModule } from '../shared/shared.module';
import { WoundComponent } from './wound/wound.component';

@NgModule({
  declarations: [AdjustComponent, WoundComponent],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    PipesModule,
    SharedModule,
  ],
  exports: [AdjustComponent],
})
export class ActionsModule {}
