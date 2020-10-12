import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ActionsModule } from 'src/app/actions/actions.module';
import { CharactersModule } from '../characters/characters.module';
import { ChatModule } from '../chat/chat.module';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../core/material/material.module';
import { NgModule } from '@angular/core';
import { PipesModule } from 'src/app/core/pipes/pipes.module';
import { RollsModule } from 'src/app/rolls/rolls.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ViewComponent } from './view/view.component';

@NgModule({
  declarations: [ViewComponent],
  imports: [
    CharactersModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    PipesModule,
    ActionsModule,
    SharedModule,
    ChatModule,
    RollsModule,
  ],
  exports: [],
})
export class CampaignsModule {}
