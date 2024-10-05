import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private router:Router) {
    
  }
  canActivate(
  
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
      
      const token = localStorage.getItem('token');
      const username= localStorage.getItem('username')
  if (token  ) {
    return true;

   
  }

   else {
    return this.router.createUrlTree(['/auth/login']);
  }
       
    
  }
}
//   if (token) {
//     if (role === 'admin') {
//       // User is authenticated as an admin, allow access
//       return true;
//     } else {
//       // User is authenticated as a regular user, redirect to user dashboard
//       return this.router.createUrlTree(['/dashboard/devicemanagement/listofdevices']);
//     }
//   } else {
//     // User is not authenticated, redirect to login page
//     return this.router.createUrlTree(['/auth/login']);
//   }
  
  
// }
// }
