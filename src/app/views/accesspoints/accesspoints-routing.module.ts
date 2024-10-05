import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditaccessComponent } from '../accesscontrol/editaccess/editaccess.component';
import { AccesspointdetailComponent } from './accesspointdetail/accesspointdetail.component';
import { CreateaccesspointComponent } from './createaccesspoint/createaccesspoint.component';
import { EditaccesspointComponent } from './editaccesspoint/editaccesspoint.component';
import { ListofaccesspointsComponent } from './listofaccesspoints/listofaccesspoints.component';
import { AuthGuard } from 'src/app/services/authguard/auth.guard';

const routes: Routes = [
  {path:"",component:ListofaccesspointsComponent,canActivate:[AuthGuard]},
  {path:"createaccesspoint",component:CreateaccesspointComponent ,canActivate:[AuthGuard]},
  {path:"editaccesspoint/:id",component:EditaccesspointComponent},
  {path:"accesspointdetail/:id",component:AccesspointdetailComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccesspointsRoutingModule { }
