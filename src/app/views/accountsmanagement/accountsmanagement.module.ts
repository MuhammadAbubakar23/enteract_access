import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountsmanagementRoutingModule } from './accountsmanagement-routing.module';
import { ListofaccountsComponent } from './listofaccounts/listofaccounts.component';
import { CreateaccountComponent } from './createaccount/createaccount.component';
import { EditaccountComponent } from './editaccount/editaccount.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [
    ListofaccountsComponent,
    CreateaccountComponent,
    EditaccountComponent
  ],
  imports: [
    CommonModule,
    AccountsmanagementRoutingModule,
    ReactiveFormsModule,
    NgxSpinnerModule
  ]
})
export class AccountsmanagementModule { }
