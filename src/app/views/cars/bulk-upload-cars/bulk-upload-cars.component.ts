import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { DatashareService } from 'src/app/services/datashareservice/datashare.service';

@Component({
  selector: 'app-bulk-upload-cars',
  templateUrl: './bulk-upload-cars.component.html',
  styleUrls: ['./bulk-upload-cars.component.css']
})
export class BulkUploadCarsComponent implements OnInit {

  constructor(private sharedata: DatashareService,  private toaster: ToastrService,
    private router:Router, private spinner: NgxSpinnerService,  ) { }

  ngOnInit(): void { this.sharedata.sendMessage(this.message);  }
  message: any = {
    title: "Cars",
    Icon: "fal fa-cars",
    subTitle: "Bulk Upload",
    Url: "/dashboard/cars"
  }

}
