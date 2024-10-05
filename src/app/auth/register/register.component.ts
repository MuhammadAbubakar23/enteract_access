import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Register } from 'src/app/layouts/shared/models/RegisterDto';
import { AuthservicesService } from 'src/app/services/authservice/authservices.service';
import { CityService } from 'src/app/services/CityService/city.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  showregAccount: boolean = true;
  showMoreInfo: boolean = false;

  register: Register = new Register();
  Cities: any;
  selectedCity:any;

  statusCode:number
  constructor(private regService: AuthservicesService,
              private router: Router,
              private toast: ToastrService,
              private cityService:CityService,
              ) {
                console.log(this.selectedCity);
               }

  registerForm = new FormGroup({
    UserName: new FormControl(this.register.UserName),
    Email: new FormControl(this.register.Email),
    Password: new FormControl(this.register.Password),
    ConfirmPassword: new FormControl(this.register.ConfirmPassword),
    PhoneNumber: new FormControl(this.register.PhoneNumber),
    Country: new FormControl(this.register.Country),
    State: new FormControl(this.register.State),
    City: new FormControl(this.register.City),
    PostalCode: new FormControl(this.register.PostalCode),
    PostalAddress: new FormControl(this.register.PostalAddress)
  });

  ngOnInit(): void {
    this.getAllCities();
  }

  toogle() {
    if (this.showregAccount) {
      this.showregAccount = false;
      this.showMoreInfo = true;
    }
  }

  getAllCities(){
    this.cityService.getAll().subscribe((res:any)=>{
      this.Cities=res.data;
      console.log("this.cities===>",this.Cities);
    })
  }


  onSubmit() {
    
  //   this.regService.registerUser(this.registerForm.value).subscribe(res=> {
  
  //     console.log("this.form.value===>",this.registerForm.value)
  //     // if(res.statusCode===200){
        
  //     // }
  //     if (res.statusCode===200){
  //   this.router.navigateByUrl("/auth/login"),
  //   this.toast.success("Congratulation! Now you can login........", "Success", { positionClass: "toast-bottom-left", })
  //     }
     
        
  //   },
  //     err => {
  //       this.toast.error("Error", "Something went wrong")
  //     })
  this.regService.registerUser(this.registerForm.value).subscribe((res:any)=>{

  if(res.statusCode===200){
    this.router.navigateByUrl("/auth/login")
    this.toast.success("Congratulation! Now you can login........", "Success", { positionClass: "toast-bottom-left", })
  }
  else {
    this.toast.error(res.error, "Error");
  }
  })
}
  


  


}