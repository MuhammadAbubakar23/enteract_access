import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-editmachineuser',
  templateUrl: './editmachineuser.component.html',
  styleUrls: ['./editmachineuser.component.css']
})
export class EditmachineuserComponent implements OnInit {

  // message: string[] = ["Users", "Edit User", "Users", "Teams", "/dashboard/listofusers", "/dashboard/listofteams", "fal fa-users", "fal fa-users-class", "fal fa-users-class", "/dashboard/listofusers", "/dashboard/listofusers/edituser", "breadcrumb-item active"];
  message: any = {
    title: "Users",
    Icon: "fal fa-users",
    subTitle: "Edit User",
    Url: "/dashboard/listofusers"
  }
  mode = "update";
  constructor(private spinner: NgxSpinnerService,) {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 4000);
  }
  ngOnInit(): void {

  }


}
