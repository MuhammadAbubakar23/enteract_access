import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CarsService } from 'src/app/services/carsService/cars.service';
import { DatashareService } from 'src/app/services/datashareservice/datashare.service';

@Component({
  selector: 'app-carview',
  templateUrl: './carview.component.html',
  styleUrls: ['./carview.component.css']
})
export class CarviewComponent implements OnInit {


  text = '';
  details: any;
  currentId: number;
  message: any = {
    title: "Cars",
    Icon: "fal fa-cars",
    subTitle: "Car Details",
    Url: "/dashboard/cars"
  };

  // carData =
  //   {
  //     vehicalDetailList: [
  //       {
  //         vehicalDetails: {
  //           vehicalNo: "LER-1526",
  //           vehicalType: "Truck",
  //           makersName: "Master Forland",
  //           model: "2017",
  //           vehicalColor: "Grey",
  //           vehicalBrand: "Forlander",
  //           carrierType: "Vendor",
  //           employeeId: null,
  //           vendorNIC: "3330338319961",
  //           visitorNIC: null,
  //           isActive: true,
  //           isBlock: false,
  //           employeeData: null,
  //           anprLogs: [],
  //           id: 1,
  //           createdDate: "2024-06-07T12:22:21.504574",
  //           createdBy: null,
  //           modifiedDate: "2024-06-07T13:16:24.207009",
  //           modifiedBy: null,
  //           status: null
  //         },
  //         ownerDetails:
  //         {
  //           name: "Khalid Haroon",
  //           id: "532424",
  //           mobile: "03347551833",
  //           city: "Lahore",
  //           location: "IBEX 1",
  //         },
  //         anprLogsList: [
  //           {
  //             date: "06-05-2024 11:21 AM",
  //             camera: "Parking HK Vision 1",
  //             location: "Lahore IBEX 1",
  //           },
  //           {
  //             date: "06-05-2024 11:22 AM",
  //             camera: "Parking HK Vision 2",
  //             location: "Lahore IBEX 2",
  //           },
  //           {
  //             date: "06-05-2024 11:23 AM",
  //             camera: "Parking HK Vision 3",
  //             location: "Lahore IBEX 3",
  //           },
  //           {
  //             date: "06-05-2024 11:24 AM",
  //             camera: "Parking HK Vision 4",
  //             location: "Lahore IBEX 1",
  //           },
  //           {
  //             date: "06-05-2024 11:25 AM",
  //             camera: "Parking HK Vision 5",
  //             location: "Lahore IBEX 2",
  //           },
  //           {
  //             date: "06-05-2024 11:26 AM",
  //             camera: "Parking HK Vision 6",
  //             location: "Lahore IBEX 3",
  //           },
  //           {
  //             date: "06-05-2024 11:27 AM",
  //             camera: "Parking HK Vision 7",
  //             location: "Lahore IBEX 1",
  //           },
  //           {
  //             date: "06-05-2024 11:28 AM",
  //             camera: "Parking HK Vision 8",
  //             location: "Lahore IBEX 2",
  //           },
  //           {
  //             date: "06-05-2024 11:29 AM",
  //             camera: "Parking HK Vision 9",
  //             location: "Lahore IBEX 3",
  //           },
  //           {
  //             date: "06-05-2024 11:30 AM",
  //             camera: "Parking HK Vision 10",
  //             location: "Lahore IBEX 1",
  //           },
  //           {
  //             date: "06-05-2024 11:31 AM",
  //             camera: "Parking HK Vision 11",
  //             location: "Lahore IBEX 2",
  //           },
  //           {
  //             date: "06-05-2024 11:32 AM",
  //             camera: "Parking HK Vision 12",
  //             location: "Lahore IBEX 3",
  //           },

  //         ]
  //       }
  //     ]
  //   }

  constructor(private sharedata: DatashareService, private spinner: NgxSpinnerService,
    private cS: CarsService, private rout: Router, private aR: ActivatedRoute) {  }

  ngOnInit(): void {
    this.aR.params.subscribe((params) => {
      console.log("recived parameter from link = " + params);
      this.currentId = params['id'];
      console.log("recived id from link param = " + this.currentId);
    })
    this.sharedata.sendMessage(this.message);
    this.getDetails();
  };

  getDetails() {

    this.spinner.show();
    this.cS.getCarDetails(this.currentId).subscribe((res) => {
      
      if (res.status === 200) {
        this.spinner.hide();
        console.log("obtained Details = " + res);
        this.details =
        {
          "vehicalDetails": {
            "vehicalNo": res.data[0].vehicalDetails.vehicalNo,
            "vehicalType": res.data[0].vehicalDetails.vehicalType,
            "makersName": res.data[0].vehicalDetails.makersName,
            "model": res.data[0].vehicalDetails.model,
            "vehicalColor": res.data[0].vehicalDetails.vehicalColor,
            "vehicalBrand": res.data[0].vehicalDetails.vehicalBrand,
            "carrierType": res.data[0].vehicalDetails.carrierType,
            "employeeId": null,
            "vendorNIC": res.data[0].vehicalDetails.vendorNIC,
            "visitorNIC": null,
            "isActive": true,
            "isBlock": false,
            "employeeData": null,
            "anprLogs": [],
            "id": 1,
            "createdDate": res.data[0].vehicalDetails.createdDate,
            "createdBy": null,
            "modifiedDate": res.data[0].vehicalDetails.modifiedDate,
            "modifiedBy": null,
            "status": null
          },
          "ownerDetails": res.data[0].ownerDetails,
          "anprLogsList": res.data[0].anprLogsList,
        }
      }
      else {
        console.log(" Failed to fetch Details ");
      }
    })

  }

  reloadComponent() {
    this.text = '';
    this.spinner.show();
    this.getDetails();
    this.details.forEach((car) => {
      car.vehicalDetails.isChecked = false;
    })
  }


}
