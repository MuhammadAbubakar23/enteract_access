import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeInfoComponent } from './employee-info.component';
import { AuthGuard } from '../services/authguard/auth.guard';
import { CctvEmployeeInfoComponent } from './cctv-employee-info/cctv-employee-info.component';

const routes: Routes = [
  {
    path:"",
    component:EmployeeInfoComponent, 
    // canActivate:[AuthGuard]
  },
  {
    path: "cctv-employee-info",
    component:CctvEmployeeInfoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeInfoRoutingModule { }
