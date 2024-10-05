import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomehomepageComponent } from './welcomehomepage/welcomehomepage.component';

const routes: Routes = [
  {
    path:'',component:WelcomehomepageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WelcomeRoutingModule { }
