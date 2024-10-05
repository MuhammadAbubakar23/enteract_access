import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/authguard/auth.guard';

const routes: Routes = [

  {
    path: "auth", loadChildren: () => import("../app/auth/auth.module").then(m => m.AuthModule)
  },
  {
    path:"",
    redirectTo:"dashboard/devicemanagement/listofdevices",
    pathMatch:"full",
    

  },
  {
    path:"welcome",loadChildren:()=>import("../app/welcome/welcome.module").then(m => m.WelcomeModule)
  },
  {
    path: "dashboard", loadChildren: () => import("src/app/layouts/default/default.module").then(m => m.DefaultModule),
    canActivate:[AuthGuard]
    
  },
  {
    path: "recent-visitors", loadChildren: () => import("../app/recent-visitors/recent-visitors.module").then(m => m.RecentVisitorsModule)
  },
  {
    path: "employee-info", loadChildren: () => import("../app/employee-info/employee-info.module").then(m => m.EmployeeInfoModule)
  },
  {
    path: "cctv", loadChildren: () => import("../app/cctv/cctv.module").then(m => m.CctvModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[AuthGuard]
})
export class AppRoutingModule { }
