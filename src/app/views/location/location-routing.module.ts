import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatelocationComponent } from './createlocation/createlocation.component';
import { EditlocationComponent } from './editlocation/editlocation.component';
import { ListoflocationsComponent } from './listoflocations/listoflocations.component';
import { LocationdetailComponent } from './locationdetail/locationdetail.component';
import { AuthGuard } from 'src/app/services/authguard/auth.guard';

const routes: Routes = [
  { path: "", component: ListoflocationsComponent,canActivate:[AuthGuard] },
  { path: "createlocation", component: CreatelocationComponent ,canActivate:[AuthGuard] },
  { path: "editlocation/:id", component: EditlocationComponent },
  { path: "locationdetail/:id", component: LocationdetailComponent }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocationRoutingModule { }
