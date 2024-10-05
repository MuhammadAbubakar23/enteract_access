import { Component, OnInit } from '@angular/core';
import { DatashareService } from 'src/app/services/datashareservice/datashare.service';

declare var toggleNavPanel: any;

@Component({
  selector: 'app-dashboards',
  templateUrl: './dashboards.component.html',
  styleUrls: ['./dashboards.component.css']
})

export class DashboardsComponent implements OnInit {

  header = {
    title: "Dashboards",
    Icon: "",
    subTitle: "",
    Url: "/dashboard/dashboards/executive", //url is yet to be given for the respective component yet to be made fal fa-home
  }
  message: any[] = [
    {
      title: "Executive",
      Icon: "fal fa-gauge pe-2",
      subTitle: "",
      Url: "/dashboard/dashboards/executive",
    }
  ]
  constructor(private dataShare: DatashareService) { }

  ngOnInit(): void {  }

  toggle() {
    ;
  }

  toggleNavTest() {
    toggleNavPanel();
  }
}
