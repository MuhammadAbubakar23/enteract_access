import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DefaultRoutingModule } from './default-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { GroupmanagementModule } from 'src/app/views/groupmanagement/groupmanagement.module';
import { MachineuserModule } from 'src/app/views/machineuser/machineuser.module';
import { DevicemanagementModule } from 'src/app/devicemanagement/devicemanagement.module';
import { UsersComponent } from 'src/app/sidenav-expanded/users/users.component';
import { CardmanagementModule } from 'src/app/cardmanagement/cardmanagement.module';
import { CarsModule } from 'src/app/views/cars/cars.module';
import { DashboardsModule } from 'src/app/views/dashboards/dashboards.module';


@NgModule({
  declarations: [
    DashboardComponent,
    UsersComponent
  ],
  imports: [
    CommonModule,
    DefaultRoutingModule,
    SharedModule,
    GroupmanagementModule,
    MachineuserModule,
    DevicemanagementModule,
    CardmanagementModule,
    CarsModule,
    DashboardsModule
  ]
})
export class DefaultModule { }
