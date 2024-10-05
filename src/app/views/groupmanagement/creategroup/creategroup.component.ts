import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-creategroup',
  templateUrl: './creategroup.component.html',
  styleUrls: ['./creategroup.component.css']
})
export class CreategroupComponent implements OnInit {

  mode = "create"
  // message: string[] = ["Groups", "Create Group", "Users", "Teams","Groups", "/dashboard/listofusers", "/dashboard/listofteams","/dashboard/listofgroups", "fal fa-users",  "/dashboard/listofgroups", "/dashboard/listofgroups/creategroup", "breadcrumb-item active"];
  message: any = {
    title: "Groups",
    Icon: "fa-light fa-users-between-lines",
    subTitle: "Create Group",
    Url: "/dashboard/listofgroups"
  }

  constructor(private spinner: NgxSpinnerService,) {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 4000);
  }

  ngOnInit(): void {

  }
}
