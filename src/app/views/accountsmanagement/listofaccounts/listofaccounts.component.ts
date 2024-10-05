import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { UseraccountService } from 'src/app/services/useraccountservice/useraccount.service';

@Component({
  selector: 'app-listofaccounts',
  templateUrl: './listofaccounts.component.html',
  styleUrls: ['./listofaccounts.component.css']
})
export class ListofaccountsComponent implements OnInit {

  constructor(private useraccountService: UseraccountService, private toastr: ToastrService, private spinner: NgxSpinnerService,) {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 4000);
  }

  UserAccounts: any;

  ngOnInit(): void {
    this.getAllUserAccounts();
  }

  getAllUserAccounts() {
    this.useraccountService.getAll().subscribe(
      (res: any) => {
        this.UserAccounts = res.data;
        console.log(res);
      },
      err => {

      })
  }

  deleteuserAccount(useraccount: any) {
    
    this.useraccountService.Remove(useraccount).subscribe(
      res => {
        this.getAllUserAccounts();
        this.toastr.success("Record has been deleted", "Success");

      },
      err => {
        console.log(err);
      }
    )

  }

}
