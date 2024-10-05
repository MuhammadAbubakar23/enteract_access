import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Login } from 'src/app/layouts/shared/models/LoginDto';
import { AuthservicesService } from 'src/app/services/authservice/authservices.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login: Login = new Login();
  token: any;
  show= false;
  username:string;
  loginForm = new FormGroup({
    Username: new FormControl(this.login.Username),
    Password: new FormControl(this.login.Password)
  })

  constructor(private authService: AuthservicesService,
              private router: Router,
              private toast:ToastrService) { }

  ngOnInit(): void {
  }
 
  showToaster(){
    
    this.toast.success("Hello, I'm the toastr message.")
}
   loginguser:any;
    userloginname:any;
   onSubmit() 
   {
    
    this.authService.loginUser(this.loginForm.value).subscribe((next: any) => {
       this.loginguser=next.data.userName;
      
       console.warn("this.loginuser====>",next)

      if(next.data==""){
        this.toast.error("Incorrect username or password","Error",{positionClass:"toast-bottom-left"})
        console.warn("next.data====>",next.data)
      }
      else{
        localStorage.setItem("token", next.data),
     localStorage.setItem("username", this.loginForm.value.Username);
     if( this.loginForm.value.Username.includes("hr")){
      this.router.navigateByUrl("/dashboard/cardmanagement/listofcards");

     }else {
      this.router.navigateByUrl("/dashboard/devicemanagement/listofdevices");

     }
        

        this.toast.success("Congratulations! You have been logged in Successfully","Success",{positionClass:"toast-bottom-left"})

      }
     
        
    }, error => {
      
    });
  }




  password(){
    this.show = !this.show;
  }

}
