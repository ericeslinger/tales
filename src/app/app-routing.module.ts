import {
  AngularFireAuthGuard,
  redirectLoggedInTo,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';
import { RouterModule, Routes } from '@angular/router';

import { GmviewComponent } from './components/campaigns/gmview/gmview.component';
import { LoginComponent } from './components/user/login/login.component';
import { NgModule } from '@angular/core';
import { PlayerviewComponent } from './components/campaigns/playerview/playerview.component';
import { RouteComponent } from './components/home/route.component';
import { RulesComponent } from './components/pages/static/rules.component';

function redirectUnauthorizedToLogin(continueUrl: string) {
  return () => redirectUnauthorizedTo(['login']);
}

const routes: Routes = [
  {
    path: 'campaigns/:campaignId/gm',
    pathMatch: 'full',
    component: GmviewComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin('/campaigns') },
  },
  {
    path: 'campaigns/:campaignId/player',
    pathMatch: 'full',
    component: PlayerviewComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin('/campaigns') },
  },
  {
    path: '',
    pathMatch: 'full',
    component: RouteComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin('/') },
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  { path: 'rules', component: RulesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
