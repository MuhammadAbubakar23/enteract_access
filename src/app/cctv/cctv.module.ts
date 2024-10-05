import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CctvRoutingModule } from './cctv-routing.module';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { CctvComponent } from './cctv/cctv.component';
import { CctvCarComponent } from './cctv-car/cctv-car.component';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [
    CctvComponent,
    CctvCarComponent
  ],
  imports: [
    CommonModule,
    CctvRoutingModule,
    FormsModule,
    ToastrModule,
    NgxSpinnerModule
  ]
})
export class CctvModule { }
