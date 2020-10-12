import { CampaignsModule } from './campaigns/campaigns.module';
import { CharactersModule } from './characters/characters.module';
import { ChatModule } from './chat/chat.module';
import { CommonModule } from '@angular/common';
import { HomeModule } from './home/home.module';
import { NgModule } from '@angular/core';
import { PagesModule } from './pages/pages.module';
import { RouterModule } from '@angular/router';
import { UserModule } from './user/user.module';
import { WelcomeComponent } from './welcome/welcome.component';

@NgModule({
  declarations: [WelcomeComponent],
  imports: [CommonModule, RouterModule],
  exports: [
    CharactersModule,
    CampaignsModule,
    HomeModule,
    PagesModule,
    ChatModule,
    UserModule,
  ],
})
export class ComponentsModule {}
