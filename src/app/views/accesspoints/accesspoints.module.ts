import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccesspointsRoutingModule } from './accesspoints-routing.module';
import { ListofaccesspointsComponent } from './listofaccesspoints/listofaccesspoints.component';
import { CreateaccesspointComponent } from './createaccesspoint/createaccesspoint.component';
import { EditaccesspointComponent } from './editaccesspoint/editaccesspoint.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { AccesspointdetailComponent } from './accesspointdetail/accesspointdetail.component';
import { CountPipe } from 'src/app/layouts/shared/models/countpipe';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [
    ListofaccesspointsComponent,
    CreateaccesspointComponent,
    EditaccesspointComponent,
    AccesspointdetailComponent,
    CountPipe
  ],
  imports: [
    CommonModule,
    AccesspointsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ToastrModule,
    MatChipsModule,
    MatIconModule,
    MatSelectModule,
    NgxSpinnerModule
  ]
})
export class AccesspointsModule { }
