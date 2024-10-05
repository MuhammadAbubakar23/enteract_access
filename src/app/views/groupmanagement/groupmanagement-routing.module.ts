import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreategroupComponent } from './creategroup/creategroup.component';
import { EditgroupComponent } from './editgroup/editgroup.component';
import { ListofgroupsComponent } from './listofgroups/listofgroups.component';
import { AuthGuard } from 'src/app/services/authguard/auth.guard';

const routes: Routes = [
  {path:"",component:ListofgroupsComponent ,canActivate:[AuthGuard]},
  {path:"creategroup",component:CreategroupComponent ,canActivate:[AuthGuard]},
  {path:"editgroup/:id",component:EditgroupComponent}


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupmanagementRoutingModule { }
