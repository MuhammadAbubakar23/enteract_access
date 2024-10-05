import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DevicemanagementRoutingModule } from './devicemanagement-routing.module';
import { EditdeviceComponent } from './editdevice/editdevice.component';
import { ListofdevicesComponent } from './listofdevices/listofdevices.component';
import { CreatedeviceComponent } from './createdevice/createdevice.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { DevicedetailComponent } from './devicedetail/devicedetail.component';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { NgxSpinnerModule } from 'ngx-spinner';
import { DeviceformComponent } from './deviceform/deviceform.component';

@NgModule({
  declarations: [
    EditdeviceComponent,
    ListofdevicesComponent,
    CreatedeviceComponent,
    DevicedetailComponent,
    DeviceformComponent,
  ],
  imports: [
    CommonModule,
    DevicemanagementRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    MatSelectModule,
    MatChipsModule,
    MatIconModule,
    NgxSpinnerModule
  ],
  exports:[
    ListofdevicesComponent
  ]
})
export class DevicemanagementModule { }
