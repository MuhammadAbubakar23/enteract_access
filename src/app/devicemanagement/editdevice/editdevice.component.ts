import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Device } from 'src/app/layouts/shared/models/DeviceDto';
import { DatashareService } from 'src/app/services/datashareservice/datashare.service';
import { DeviceService } from 'src/app/services/deviceservice/device.service';

@Component({
  selector: 'app-editdevice',
  templateUrl: './editdevice.component.html',
  styleUrls: ['./editdevice.component.css']
})
export class EditdeviceComponent implements OnInit {
  mode = 'update';
  // message: string[] = ["Device", "Edit Device", "breadcrumb-item active", "", "", "", "", "", "fal fa-desktop", "/dashboard/devicemanagement/listofdevices", "/dashboard/devicemanagement/editdevice/", "breadcrumb-item active"];

  message : any = {
    title: "Device",
    Icon: "fal fa-desktop",
    subTitle: "Edit Device",
    Url: "/dashboard/devicemanagement/listofdevices"
  }
  constructor(private deviceService: DeviceService, private spinner: NgxSpinnerService,
  ) {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 4000);
   }

  ngOnInit(): void {

  }



}
