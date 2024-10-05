import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { UserAccount } from 'src/app/layouts/shared/models/UserAccountsDto';
import { DatashareService } from 'src/app/services/datashareservice/datashare.service';
import { UseraccountService } from 'src/app/services/useraccountservice/useraccount.service';

@Component({
  selector: 'app-createaccount',
  templateUrl: './createaccount.component.html',
  styleUrls: ['./createaccount.component.css']
})
export class CreateaccountComponent implements OnInit {


  userAccount = new UserAccount();
  // message:string[]=["Account","Create Account"]

  message: any = {
    title: "Account",
    // Icon: "fal fa-cars",
    subTitle: "Create Account",
    // Url: "/cars"
  }

  userAccountForm = new FormGroup({
    User_ID: new FormControl(this.userAccount.user_ID),
    Full_Name: new FormControl(this.userAccount.full_Name),
    Gender: new FormControl(this.userAccount.gender),
    Email: new FormControl(this.userAccount.email),
    Phone: new FormControl(this.userAccount.phone),
    Password: new FormControl(this.userAccount.password),
    Validity: new FormControl(this.userAccount.validity),
    Remarks: new FormControl(this.userAccount.remarks),
    Card_Number: new FormControl(this.userAccount.card_Number),
    Card_Type: new FormControl(this.userAccount.card_Type)

  })


  constructor(private userAccountService: UseraccountService,
    private toastr: ToastrService,
    private router: Router,
    private dataShare: DatashareService,
    private spinner: NgxSpinnerService,) {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 4000);
  }

  ngOnInit(): void {
    this.dataShare.sendMessage(this.message);
  }

  addUserAccount() {
    
    this.userAccountService.Add(this.userAccountForm.value).subscribe((res: any) => {
      this.router.navigateByUrl("/dashboard/accountmanagement/listofaccounts");
      this.toastr.success("Account in added Successfully", "Success");

    },
      err => {
        this.toastr.error("Something went wrong", "Error");

      }
    )

  }


}
