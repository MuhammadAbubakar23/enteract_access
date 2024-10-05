import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CctvComponent } from './cctv/cctv.component';
import { CctvCarComponent } from './cctv-car/cctv-car.component';

const routes: Routes = [
  {
    path:"",
    component:CctvComponent,     
  },
  {
    path:"car",
    component:CctvCarComponent,     
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CctvRoutingModule { }
