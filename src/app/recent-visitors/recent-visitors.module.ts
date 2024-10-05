import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecentVisitorsRoutingModule } from './recent-visitors-routing.module';
import { RecentVisitorsComponent } from './recent-visitors.component';
import { HttpClientModule } from '@angular/common/http';
import { RemoveminutespipePipe } from '../layouts/shared/pipes/removeminutespipe.pipe';


@NgModule({
  declarations: [
    RecentVisitorsComponent,
    RemoveminutespipePipe
  ],
  imports: [
    CommonModule,
    RecentVisitorsRoutingModule,
    HttpClientModule
  ]
})
export class RecentVisitorsModule { }
