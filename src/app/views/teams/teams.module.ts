import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeamsRoutingModule } from './teams-routing.module';
import { ListofteamsComponent } from './listofteams/listofteams.component';
import { CreateteamComponent } from './createteam/createteam.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditteamComponent } from './editteam/editteam.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { TeamdetailComponent } from './teamdetail/teamdetail.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { TeamsformComponent } from './teamsform/teamsform.component';


@NgModule({
  declarations: [
    ListofteamsComponent,
    CreateteamComponent,
    EditteamComponent,
    TeamdetailComponent,
    TeamsformComponent
  ],
  imports: [
    CommonModule,
    TeamsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    NgxSpinnerModule
  ]
})
export class TeamsModule { }
