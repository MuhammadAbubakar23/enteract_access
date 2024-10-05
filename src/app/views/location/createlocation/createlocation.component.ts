import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Location } from 'src/app/layouts/shared/models/LocationDto';
import { CityService } from 'src/app/services/CityService/city.service';
import { DatashareService } from 'src/app/services/datashareservice/datashare.service';
import { LocationService } from 'src/app/services/locationservices/location.service';

@Component({
  selector: 'app-createlocation',
  templateUrl: './createlocation.component.html',
  styleUrls: ['./createlocation.component.css']
})
export class CreatelocationComponent implements OnInit {

  // message:string[]=["Locations","Create Location","Locations","Access Points","/dashboard/listoflocations","/dashboard/listofaccesspoints","fal fa-map-marker-alt","fal fa-badge-check","fal fa-map-marker-alt","/dashboard/listoflocations","/dashboard/listoflocations/createlocation","breadcrumb-item active"];

  message: any = {
    title: "Locations",
    Icon: "fal fa-map-marker-alt",
    subTitle: "Create Location",
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
