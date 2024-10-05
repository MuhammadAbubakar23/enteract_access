import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExecutiveComponent } from './executive/executive.component';
import { DevicesComponent } from './devices/devices.component';
import { VehiclesComponent } from './vehicles/vehicles.component';

const routes: Routes = [
  { path: "executive", component: ExecutiveComponent  },
  { path: "devices", component: DevicesComponent },
  { path: "vehicles", component: VehiclesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardsRoutingModule { }
