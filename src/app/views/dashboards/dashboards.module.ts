import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';
import { DashboardsRoutingModule } from './dashboards-routing.module';
import { ExecutiveComponent } from './executive/executive.component';
import { DevicesComponent } from './devices/devices.component';
import { VehiclesComponent } from './vehicles/vehicles.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ExecutiveComponent,
    DevicesComponent,
    VehiclesComponent
  ],
  imports: [
    CommonModule,
    DashboardsRoutingModule,
    NgxSpinnerModule,
    FormsModule
  ]
})
export class DashboardsModule { }
