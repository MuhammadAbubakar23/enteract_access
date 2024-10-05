import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatashareService } from 'src/app/services/datashareservice/datashare.service';
import { DeviceService } from 'src/app/services/deviceservice/device.service';

@Component({
  selector: 'app-creataeaccess',
  templateUrl: './creataeaccess.component.html',
  styleUrls: ['./creataeaccess.component.css']
})
export class CreataeaccessComponent implements OnInit {


  message: string[] = ["Access", "Create Access", "", "", "", ""];
  devices: any;

  constructor(private dataShare: DatashareService, private spinner: NgxSpinnerService,) { 
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 4000);
  }

  ngOnInit(): void {
    this.dataShare.sendMessage(this.message);
  }



}
