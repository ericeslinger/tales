import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FirebaseUIModule } from 'firebaseui-angular';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login.component';
import { MaterialModule } from 'src/app/core/material/material.module';
import { NgModule } from '@angular/core';
import { RouteComponent } from './view/route.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ViewComponent } from './view/view.component';

@NgModule({
  declarations: [LoginComponent, ViewComponent, RouteComponent],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule,
    FirebaseUIModule.forFeature({}),
  ],
})
export class UserModule {}
