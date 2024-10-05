import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BulkuploadComponent } from './bulkupload/bulkupload.component';
import { CreatemachineuserComponent } from './createmachineuser/createmachineuser.component';
import { EditmachineuserComponent } from './editmachineuser/editmachineuser.component';
import { ListofmachineusersComponent } from './listofmachineusers/listofmachineusers.component';
import { UserdetailComponent } from './userdetail/userdetail.component';
import { AuthGuard } from 'src/app/services/authguard/auth.guard';

const routes: Routes = [
  {path:"",component:ListofmachineusersComponent ,canActivate:[AuthGuard]},
  {path:"createuser",component:CreatemachineuserComponent ,canActivate:[AuthGuard]},
  {path:"edituser/:id",component:EditmachineuserComponent,canActivate:[AuthGuard]},
  {path:"machineuserbulkdata",component:BulkuploadComponent ,canActivate:[AuthGuard]},
  {path:"userdetail/:id",component:UserdetailComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MachineuserRoutingModule { }
