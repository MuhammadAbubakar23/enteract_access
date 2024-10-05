import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeInfoRoutingModule } from './employee-info-routing.module';
import { EmployeeInfoComponent } from './employee-info.component';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { CctvEmployeeInfoComponent } from './cctv-employee-info/cctv-employee-info.component';


@NgModule({
  declarations: [
    EmployeeInfoComponent,
    CctvEmployeeInfoComponent
  ],
  imports: [
    CommonModule,
    EmployeeInfoRoutingModule,
    FormsModule,
    ToastrModule
  ]
})
export class EmployeeInfoModule { }
