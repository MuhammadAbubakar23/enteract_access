import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatepermissionComponent } from './createpermission/createpermission.component';
import { EditpermissionComponent } from './editpermission/editpermission.component';
import { ListofpermissionsComponent } from './listofpermissions/listofpermissions.component';
import { AuthGuard } from 'src/app/services/authguard/auth.guard';

const routes: Routes = [
  {path:"",component:ListofpermissionsComponent,canActivate:[AuthGuard]},
  {path:"createpermission",component:CreatepermissionComponent ,canActivate:[AuthGuard]},
  {path:"editpermission/:name",component:EditpermissionComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PermissionsRoutingModule { }
