import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PermissionsRoutingModule } from './permissions-routing.module';
import { ListofpermissionsComponent } from './listofpermissions/listofpermissions.component';
import { CreatepermissionComponent } from './createpermission/createpermission.component';
import { EditpermissionComponent } from './editpermission/editpermission.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RemovewhitespacesPipe } from 'src/app/layouts/shared/removewhitespacepipe';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [
    ListofpermissionsComponent,
    CreatepermissionComponent,
    EditpermissionComponent,
    RemovewhitespacesPipe
  ],
  imports: [
    CommonModule,
    PermissionsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxSpinnerModule
  ]
})
export class PermissionsModule { }
