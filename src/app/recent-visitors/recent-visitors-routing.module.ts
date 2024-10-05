import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../services/authguard/auth.guard';
import { RecentVisitorsComponent } from './recent-visitors.component';

const routes: Routes = [
  {
    path:"",
    component:RecentVisitorsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecentVisitorsRoutingModule { }
