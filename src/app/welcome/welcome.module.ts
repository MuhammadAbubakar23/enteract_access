import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WelcomeRoutingModule } from './welcome-routing.module';
import { WelcomehomepageComponent } from './welcomehomepage/welcomehomepage.component';

import { NgxSpinnerModule } from 'ngx-spinner';
@NgModule({
  declarations: [
    WelcomehomepageComponent
  ],
  imports: [
    CommonModule,
    WelcomeRoutingModule,
    NgxSpinnerModule
  ]
})
export class WelcomeModule { }
