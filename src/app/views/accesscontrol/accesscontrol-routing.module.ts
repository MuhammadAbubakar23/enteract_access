import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreataeaccessComponent } from './creataeaccess/creataeaccess.component';
import { EditaccessComponent } from './editaccess/editaccess.component';
import { ListofaccessesComponent } from './listofaccesses/listofaccesses.component';
import { AuthGuard } from 'src/app/services/authguard/auth.guard';

const routes: Routes = [
  {path:"listofaccess",component:ListofaccessesComponent ,canActivate:[AuthGuard]},
  {path:"createaccess",component:CreataeaccessComponent ,canActivate:[AuthGuard]},
  {path:"editaccess",component:EditaccessComponent ,canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccesscontrolRoutingModule { }
