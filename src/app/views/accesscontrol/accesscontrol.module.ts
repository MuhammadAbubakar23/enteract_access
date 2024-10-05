import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccesscontrolRoutingModule } from './accesscontrol-routing.module';
import { CreataeaccessComponent } from './creataeaccess/creataeaccess.component';
import { EditaccessComponent } from './editaccess/editaccess.component';
import { ListofaccessesComponent } from './listofaccesses/listofaccesses.component';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [
    CreataeaccessComponent,
    EditaccessComponent,
    ListofaccessesComponent
  ],
  imports: [
    CommonModule,
    AccesscontrolRoutingModule,
    NgxSpinnerModule
  ]
})
export class AccesscontrolModule { }
