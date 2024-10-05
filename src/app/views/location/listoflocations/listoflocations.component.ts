import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CityService } from 'src/app/services/CityService/city.service';
import { DatashareService } from 'src/app/services/datashareservice/datashare.service';
import { LocationService } from 'src/app/services/locationservices/location.service';

@Component({
  selector: 'app-listoflocations',
  templateUrl: './listoflocations.component.html',
  styleUrls: ['./listoflocations.component.css']
})
export class ListoflocationsComponent implements OnInit {

  Locations: any[] = [];
  loc: string = "";
  city: string = "";
  srch: string = "";
  p: any = 1;
  itemsPerPage: any = 10;
  locationCount: any;
  Starting_Point: any;
  Ending_Point: any;
  totalPages: any;
  buildingType: any = "";
  Ids: any[] = [];
  isChecked = false;
  isCheckedAll = false;
  masterSelected = false;
  cities: any
  // message: string[] = ["Locations", "", "Locations", "Access Points", "/dashboard/listoflocations",
  //  "/dashboard/listofaccesspoints", "fal fa-map-marker-alt", "fal fa-badge-check", 
  //  "fal fa-map-marker-alt", "/dashboard/listoflocations"];

  message: any = {
    title: "Locations",
    Icon: "fal fa-map-marker-alt",
    subTitle: "",
    Url: "/dashboard/listoflocations"
  }



  sort: any;
  modalRef: BsModalRef
  Length: any;

  constructor(public locService: LocationService,
    private dataShare: DatashareService,
    private router: Router,
    private toastr: ToastrService,
    private SpinnerService: NgxSpinnerService,
    private modalService: BsModalService,
    private cityService: CityService) {
      this.SpinnerService.show();
    setTimeout(() => {
      this.SpinnerService.hide();
    }, 4000);
  }

  ngOnInit(): void {
    this.getAllCities();
    this.getAllLocations();
    this.dataShare.sendMessage(this.message);
  }

  getAllCities() {
    this.cityService.getAll().subscribe((res: any) => {
      console.log("Cities==>", res.data)
      this.cities = res.data
    })
  }
  getAllLocations() {
    
    // let data = {
    //   Search: this.srch,
    //   Page_No: this.p,
    //   ItemsPerPage: this.itemsPerPage,
    //   City: this.city,
    //   BuildingType: this.buildingType,
    //   Sort: this.sort

    // }

    this.SpinnerService.show();
    this.locService.getAllLocations().subscribe((res: any) => {
      console.log("locations===>", res)

      this.SpinnerService.hide();
      this.Locations = res?.data;
      this.locationCount = res?.pagination?.count;
      this.Starting_Point = res?.pagination?.starting_Point;
      this.Ending_Point = res?.pagination?.ending_Point;
      this.totalPages = res?.pagination?.totalPages;

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
    this.getAllLocations();

  }

  getLocByName() {
    this.city = "";
    this.buildingType = "";
    this.getAllLocations();
  }

  getLocByCity() {
    this.srch = "";
    this.buildingType = "";
    this.getAllLocations();

  }
  getLocByB_Type() {
    this.srch = "";
    this.city = "";
    this.getAllLocations();

  }


  deleteLocation(location: any) {
    
    this.locService.Remove(location).subscribe((res: any) => {
      this.getAllLocations();
      console.log(res);
    })
  }

  deleteMultiple() {
    
    this.locService.deleteMultiple(this.Ids).subscribe(res => {
      this.toastr.success("Selected record deleted", "Success");

      this.getAllLocations();

    },
      err => {
        console.log(err);
      })

  }

  checkUncheckAll(evt) {
    this.Locations.forEach((c) => c.isChecked = evt.target.checked)

    this.masterSelected = this.Locations.every((l) => l.isChecked == true);

    if (this.masterSelected == true) {
      this.Locations.forEach((d) => {
        this.Ids.push(d.id);
      })
      console.log(this.Ids);
      this.isChecked = true;
      this.isCheckedAll = true;
    }
    else {
      this.Locations.forEach((d) => {
        for (var i = 0; i <= this.Ids.length; i++) {
          if (this.Ids[i] == d.id) {
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

    this.Locations[index].isChecked = evt.target.checked
    this.masterSelected = this.Locations.every((l) => l.isChecked == true);

    let checkselectedlogs = this.Locations.find(x => x.isChecked == true);
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
    this.getAllLocations();
    this.isChecked = false;
    this.isCheckedAll = false;
    this.masterSelected = false;
  }

}
