import { Component, OnInit, TemplateRef } from '@angular/core';
import { AccesspointService } from 'src/app/services/accesspointservice/accesspoint.service';
import { DatashareService } from 'src/app/services/datashareservice/datashare.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CityService } from 'src/app/services/CityService/city.service';
import { LocationService } from 'src/app/services/locationservices/location.service';
import { FloorService } from 'src/app/services/floorservice/floor.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-listofaccesspoints',
  templateUrl: './listofaccesspoints.component.html',
  styleUrls: ['./listofaccesspoints.component.css']
})
export class ListofaccesspointsComponent implements OnInit {


  AccessPoints: any;
  Ids: any[] = [];
  // message: string[] = ["Access Points", "", "Locations", "Access Points", "/dashboard/listoflocations", "/dashboard/listofaccesspoints", "fal fa-map-marker-alt", "fal fa-badge-check", "fal fa-badge-check", "/dashboard/listofaccesspoints"];
  message: any = {
    title: "Access Points",
    Icon: "fal fa-badge-check",
    subTitle: "",
    Url: "/dashboard/listofaccesspoints"
  }
  Device: any;
  pageNo: any = 1;
  itemsperpage: any = 10;
  search: string = "";
  Cities: any;
  Floors: any;
  Locations: any;
  cityid: number = 0;
  locationid: number = 0;
  floorid: number = 0;
  totalPages: any;
  p: any;
  sort: any;
  Starting_Point: any;
  Ending_Point: any;
  accesspointCount: any;
  modalRef: BsModalRef


  constructor(private accessPointService: AccesspointService,
    private dataShare: DatashareService,
    private toastr: ToastrService,
    private router: Router,
    private cityService: CityService,
    private locationService: LocationService,
    private floorService: FloorService,
    private SpinnerService: NgxSpinnerService,
    private modalService: BsModalService) {
    this.SpinnerService.show();
    setTimeout(() => {
      this.SpinnerService.hide();
    }, 4000);
  }

  ngOnInit(): void {
    this.getAllAccessPoints();
    this.dataShare.sendMessage(this.message);
    this.getAllCities();
    this.getAllLocations();
    this.getAllFloors();
  }

  getAllCities() {
    this.cityService.getAll().subscribe((res: any) => {
      this.Cities = res.data;
    })
  }

  getAllLocations() {
    this.locationService.getAllLocations().subscribe((res: any) => {
      this.Locations = res.data;
    })
  }
  getAllFloors() {
    this.floorService.getAll().subscribe((res: any) => {
      this.Floors = res.data;
    })
  }
  getAllAccessPoints() {
    let data = {
      Page_No: this.pageNo,
      ItemsPerPage: this.itemsperpage,
      Search: this.search,
      City_Id: this.cityid,
      Location_Id: this.locationid,
      Floor_Id: this.floorid,
      Sort: this.sort
    }
    this.SpinnerService.show();
    this.accessPointService.getAll(data).subscribe((res: any) => {
      console.log("Hello===>", res.data);
      this.SpinnerService.hide();
      
      this.AccessPoints = res.data.result;
      this.Starting_Point = res.data.startingpoint;
      this.Ending_Point = res.data.endingpoint;
      this.accesspointCount = res.data.count;
      // res.data.result.forEach(app => {
      //   app.device.forEach(dev => {
      //     console.log(dev.type);
      //     if(dev.type=="INN"){
      //       this.typeclass="badge oceanBg"
      //     }
      //     else if(dev.type=="OUT"){
      //       this.typeclass="badge mangoBg"
      //     }

      //   });

      // });
      // let data = this.AccessPoints[15].device

      console.log(this.Device)
    })

  }


  yesorNo: boolean = false;

  openModalNext(popupNext: TemplateRef<any>) {

    if (this.Locations.find(x => x.isChecked == true) && (this.p < this.totalPages)) {
      this.modalRef = this.modalService.show(popupNext);
    }
    else {
      this.NextPage(this.p)
    }

  }
  openModalPrevious(popupPrevious: TemplateRef<any>) {

    if (this.Locations.find(x => x.isChecked == true) && (this.p > 1)) {
      this.modalRef = this.modalService.show(popupPrevious);
    }
    else {
      this.PreviousPage(this.p)
    }

  }

  maketrueNext() {
    
    this.yesorNo = !this.yesorNo;
    this.NextPage(this.p);
    this.modalRef.hide();

  }
  maketruePrevious() {
    
    this.yesorNo = !this.yesorNo;
    this.PreviousPage(this.p);
    this.modalRef.hide();

  }

  NextPage(p: any) {
    

    let page = p + 1;
    
    if (page < this.totalPages) {
      this.p = page;
      console.log("This is count of Total Pages::", this.totalPages);
      if (this.Locations.find(x => x.isChecked == true)) {
        this.isChecked = false;
        this.isCheckedAll = false;
        this.masterSelected = false;
      }
      this.getAllLocations();
    }
    this.p;





  }
  PreviousPage(p: any) {
    
    if (p >= 1) {
      let page = p - 1;
      if (page > 0) {
        this.p = page;
        if (this.Locations.find(x => x.isChecked == true)) {
          this.isChecked = false;
          this.isCheckedAll = false;
          this.masterSelected = false;
        }

        this.getAllLocations();
      }
    }

  }

  getsortValue(evt) {
    
    this.sort = evt.target.innerHTML;
    this.getAllAccessPoints();

  }


  DeleteAccessPoint(id: any) {
    
    this.accessPointService.Remove(id).subscribe((res: any) => {
      this.getAllAccessPoints();

    })
  }

  deleteMultiple() {
    
    this.accessPointService.deletemultiple(this.Ids).subscribe(res => {
      this.toastr.success("Selected record deleted", "Success");
      this.getAllAccessPoints();
    },
      err => {
        console.log(err);
      })

  }

  isChecked = false;
  isCheckedAll = false;
  masterSelected = false;

  checkUncheckAll(evt) {
    
    this.AccessPoints.forEach((c) => c.isChecked = evt.target.checked)

    this.masterSelected = this.AccessPoints.every((l) => l.isChecked == true);

    if (this.masterSelected == true) {
      this.AccessPoints.forEach((d) => {
        this.Ids.push(d.accesspoint.id);
      })
      console.log(this.Ids);
      this.isChecked = true;
      this.isCheckedAll = true;
    }
    else {
      this.AccessPoints.forEach((d) => {
        for (var i = 0; i <= this.Ids.length; i++) {
          if (this.Ids[i] == d.accesspoint.id) {
            this.Ids.splice(i, 1);
          }
        }
      })
      console.log(this.Ids);
      this.isChecked = false;
      this.isCheckedAll = false;

    }

  }

  isAllSelected(evt, index) {
    
    let id = Number(evt.target.value);
    if (index >= 0 && evt.target.checked == true) {
      this.Ids.push(id);
      console.log(this.Ids);
    }

    if (evt.target.checked == false) {
      for (var i = 0; i <= this.Ids.length; i++) {
        if (this.Ids[i] == id) {
          this.Ids.splice(i, 1);
        }

      }
      console.log(this.Ids)
    }

    this.AccessPoints[index].isChecked = evt.target.checked
    this.masterSelected = this.AccessPoints.every((l) => l.isChecked == true);

    let checkselectedlogs = this.AccessPoints.find(x => x.isChecked == true);
    if (this.masterSelected == true) {

      this.isChecked = true;
      this.isCheckedAll = true;
    }
    else if (checkselectedlogs != undefined) {
      this.isChecked = true;
      this.isCheckedAll = false;

    }
    else {
      this.isChecked = false
    }
  }

  reloadComponent() {
    
    // let currentUrl = this.router.url;
    // this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    // this.router.onSameUrlNavigation = 'reload';
    // this.router.navigate([currentUrl]);

    this.p = 1;
    this.getAllAccessPoints();

    this.masterSelected = false;
    this.isChecked = false;
    this.isCheckedAll = false;
  }

}
