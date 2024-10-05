import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-editlocation',
  templateUrl: './editlocation.component.html',
  styleUrls: ['./editlocation.component.css']
})
export class EditlocationComponent implements OnInit {

  // message:string[]=["Locations","Create Location","Locations","Access Points","/dashboard/listoflocations","/dashboard/listofaccesspoints","fal fa-map-marker-alt","fal fa-badge-check","fal fa-map-marker-alt","/dashboard/listoflocations","/dashboard/listoflocations/createlocation","breadcrumb-item active"];

  message: any = {
    title: "Locations",
    Icon: "fal fa-map-marker-alt",
    subTitle: "Edit Location",
    Url: "/dashboard/listoflocations"
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
