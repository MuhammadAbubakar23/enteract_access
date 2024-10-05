import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatedeviceComponent } from './createdevice/createdevice.component';
import { DevicedetailComponent } from './devicedetail/devicedetail.component';
import { EditdeviceComponent } from './editdevice/editdevice.component';
import { ListofdevicesComponent } from './listofdevices/listofdevices.component';
import { AuthGuard } from '../services/authguard/auth.guard';

const routes: Routes = [
  {path:"listofdevices",component:ListofdevicesComponent},
  {path:"editdevice/:id",component:EditdeviceComponent},
  {path:"editdevice",component:EditdeviceComponent},
  {path:"createdevice",component:CreatedeviceComponent},
  {path:"devicedetail/:id",component:DevicedetailComponent },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class DevicemanagementRoutingModule { }
