import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatashareService } from 'src/app/services/datashareservice/datashare.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  username: string;
  customval: any = {};


  constructor(private router:Router,private activatedRoute:ActivatedRoute,private sharedData:DatashareService) { 
    this.username = localStorage.getItem('username');
    console.log("this.usernamefor services===>",this.username)
  }

  ngOnInit(): void {
    this.sharedData.getMessage().subscribe((res:any)=>{
      this.customval=res;
      console.log( "this.customval===>",this.customval);
    })

    // if(this.router.url=="/dashboard/devicemanagement/listofdevices"){
    //   this.customval="Device";
    // }
    // else if(this.router.url=="/dashboard/listofusers"){
    //  this.customval="Users";
    // }
    
  }

  isAdminLoggedIn(): boolean {
    const loggedInUser = localStorage.getItem("username");
    return loggedInUser.includes("hr");
 }

  logout(){
    
    localStorage.removeItem("token");
    this.router.navigateByUrl("/auth/login");
  }

}
