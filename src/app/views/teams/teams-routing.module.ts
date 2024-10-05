import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateteamComponent } from './createteam/createteam.component';
import { EditteamComponent } from './editteam/editteam.component';
import { ListofteamsComponent } from './listofteams/listofteams.component';
import { TeamdetailComponent } from './teamdetail/teamdetail.component';
import { AuthGuard } from 'src/app/services/authguard/auth.guard';

const routes: Routes = [
{path:"",component:ListofteamsComponent ,canActivate:[AuthGuard]},
{path:"createteam",component:CreateteamComponent ,canActivate:[AuthGuard]},
{path:"editteam/:id",component:EditteamComponent},
{path:"teamdetail/:id",component:TeamdetailComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamsRoutingModule { }
