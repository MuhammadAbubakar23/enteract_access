import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-editteam',
  templateUrl: './editteam.component.html',
  styleUrls: ['./editteam.component.css']
})
export class EditteamComponent implements OnInit {

  mode = "update";
  // message:string[]=["Teams","Edit Team","Users","Teams","/dashboard/listofusers","/dashboard/listofteams","fal fa-users","fal fa-users-class","fal fa-users-class","/dashboard/listofteams","/dashboard/listofteams/editteam","breadcrumb-item active"];
  message: any = {
    title: "Teams",
    Icon: "fal fa-users-class pe-2",
    subTitle: "Edit Team",
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
