import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { UserAccount } from 'src/app/layouts/shared/models/UserAccountsDto';
import { UseraccountService } from 'src/app/services/useraccountservice/useraccount.service';

@Component({
  selector: 'app-editaccount',
  templateUrl: './editaccount.component.html',
  styleUrls: ['./editaccount.component.css']
})
export class EditaccountComponent implements OnInit {

  id = this.activatedRoute.snapshot.params["id"];
  num_Id = Number(this.id);

  userAccount = new UserAccount();

  userAccountForm = new FormGroup({
    Id:new FormControl(this.userAccount.id),
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
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,) { 
      this.spinner.show();
      setTimeout(() => {
        this.spinner.hide();
      }, 4000);
    }

  ngOnInit(): void {
    this.getUserAccountById(this.num_Id);
  }

  getUserAccountById(id:any) {
    
    this.userAccountService.getById(id).subscribe(
      (res:any) => {
        console.log(res);
        this.userAccountForm.patchValue({
          Id:res.data.id,
          User_ID: res.data.user_ID,
          Full_Name: res.data.full_Name,
          Gender: res.data.gender,
          Email: res.data.email,
          Phone: res.data.phone,
          Password: res.data.password,
          Validity: res.data.validity,
          Remarks: res.data.remarks,
          Card_Number: res.data.card_Number,
          Card_Type: res.data.card_Type

        })
      }
    )

  }

  editUserAccount() {
    
    this.userAccountService.Update(this.userAccountForm.value).subscribe(
      res=>{
        this.router.navigateByUrl("/dashboard/accountmanagement/listofaccounts");
        this.toastr.success("Record updated Successfully","Success");
      },
      err=>{
        this.toastr.error("Something went wrong","Error");
      }
    )

  }



}
