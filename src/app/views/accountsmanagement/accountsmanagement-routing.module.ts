import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateaccountComponent } from './createaccount/createaccount.component';
import { EditaccountComponent } from './editaccount/editaccount.component';
import { ListofaccountsComponent } from './listofaccounts/listofaccounts.component';
import { AuthGuard } from 'src/app/services/authguard/auth.guard';

const routes: Routes = [
  {path:"listofaccounts",component:ListofaccountsComponent ,canActivate:[AuthGuard]},
  {path:"createaccount",component:CreateaccountComponent ,canActivate:[AuthGuard]},
  {path:"editaccount/:id",component:EditaccountComponent ,canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountsmanagementRoutingModule { }
