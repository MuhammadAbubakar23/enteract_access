import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogsComponent } from 'src/app/views/logs/logs.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from 'src/app/services/authguard/auth.guard';

const routes: Routes = [
  {
    path: "", component: DashboardComponent,
    children: [
      { path: "logs", component: LogsComponent ,canActivate:[AuthGuard] },
      {path:'cardmanagement',loadChildren:()=>import("src/app/cardmanagement/cardmanagement.module").then(m=>m.CardmanagementModule)},
      {
        path: "listofusers", loadChildren: () => import("src/app/views/machineuser/machineuser.module").then(m => m.MachineuserModule)
      },

      {
        path: "listofgroups", loadChildren: () => import("src/app/views/groupmanagement/groupmanagement.module").then(m => m.GroupmanagementModule)
      },
      {
        path: "groupmanagement", loadChildren: () => import("src/app/views/groupmanagement/groupmanagement.module").then(m => m.GroupmanagementModule)
      },
      {
        path: "devicemanagement", loadChildren: () => import("src/app/devicemanagement/devicemanagement.module").then(m => m.DevicemanagementModule)
      },

      {
        path: "accessmanagement", loadChildren: () => import("src/app/views/accesscontrol/accesscontrol.module").then(m => m.AccesscontrolModule)
      },

      {
        path: "accountmanagement", loadChildren: () => import("src/app/views/accountsmanagement/accountsmanagement.module").then(m => m.AccountsmanagementModule)
      },
      {
        path:"listoflocations",loadChildren:()=>import("src/app/views/location/location.module").then(m=>m.LocationModule)
      },
      {
        path:"listofteams",loadChildren:()=>import("src/app/views/teams/teams.module").then(m=>m.TeamsModule)
      },
      {
        path:"listofaccesspoints",loadChildren:()=>import("src/app/views/accesspoints//accesspoints.module").then(m=>m.AccesspointsModule)
      },
      {
        path:"listofpermissions",loadChildren:()=>import("src/app/views/permissions/permissions.module").then(m=>m.PermissionsModule)
      },
      {
        path:"cars",loadChildren:()=>import("src/app/views/cars/cars.module").then(m=>m.CarsModule)
      },
      {
        path:"dashboards",loadChildren:()=>import("src/app/views/dashboards/dashboards.module").then(m=>m.DashboardsModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DefaultRoutingModule { }
