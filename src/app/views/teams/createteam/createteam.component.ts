import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-createteam',
  templateUrl: './createteam.component.html',
  styleUrls: ['./createteam.component.css']
})
export class CreateteamComponent implements OnInit {


  mode = "create";
  // message: string[] = ["Teams", "Create Team", "Users", "Teams", "/dashboard/listofusers", "/dashboard/listofteams", "fal fa-users", "fal fa-users-class", "fal fa-users-class", "/dashboard/listofteams", "/dashboard/listofteams/createteam", "breadcrumb-item active"];

  message: any = {
    title: "Teams",
    Icon: "fal fa-users-class pe-2",
    subTitle: "Create Team",
    Url: "/dashboard/listofteams"
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
