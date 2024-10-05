import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

import { DeviceService } from 'src/app/services/deviceservice/device.service';

@Component({
  selector: 'app-createdevice',
  templateUrl: './createdevice.component.html',
  styleUrls: ['./createdevice.component.css']
})
export class CreatedeviceComponent implements OnInit {
  mode = 'create';
  // message: string[] = ["Devices", "Create Device", "", "", "", "", "", "", "fal fa-desktop", "devicemanagement/listofdevices", "devicemanagement/createdevice","breadcrumb-item active"]

  message: any = {
    title: "Devices",
    Icon: "fal fa-desktop",
    subTitle: "Create Device",
    Url: "devicemanagement/listofdevices"
  }

  constructor(private deviceService: DeviceService, private spinner: NgxSpinnerService,) {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 4000);
  }

  ngOnInit(): void {

  }

}
