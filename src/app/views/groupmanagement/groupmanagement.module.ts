import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupmanagementRoutingModule } from './groupmanagement-routing.module';
import { ListofgroupsComponent } from './listofgroups/listofgroups.component';
import { CreategroupComponent } from './creategroup/creategroup.component';
import { EditgroupComponent } from './editgroup/editgroup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { GroupformComponent } from './groupform/groupform.component';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [
    ListofgroupsComponent,
    CreategroupComponent,

    EditgroupComponent,
      GroupformComponent
  ],
  imports: [
    CommonModule,
    GroupmanagementRoutingModule,
    ReactiveFormsModule,
    NgxSpinnerModule
  ],
  exports:[
    ListofgroupsComponent
  ]
})
export class GroupmanagementModule { }
