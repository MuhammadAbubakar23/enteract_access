import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { title } from 'process';
import { CarsService } from 'src/app/services/carsService/cars.service';
import { DatashareService } from 'src/app/services/datashareservice/datashare.service';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {

  search: string = "";
  totalCarsCount: any;
  Starting_Point: any;
  Ending_Point: any;
  pageNumber: any = 1;
  totalPages: number = 10; 
  recordsPerPage: number = 10;
  displayLogRecords: any[] = [];
  p: any = 1;
  sort: string = "";
  carDetails: any;
  Cars: any[] = [];
  Ids: any[] = [];
  isChecked = false;
  isCheckedAll = false;
  masterSelected = false;
  currentId=0;
  modalRef: BsModalRef
  //message: string[] = ["Cars", "", "", "", "", "", "", "", "fal fa-cars", "cars/cars"]
  message: any = {
    title: "Cars",
    Icon: "fal fa-cars",
    subTitle: "",
    Url: "/cars"
  };

  constructor(private sharedata: DatashareService,
    private spinner: NgxSpinnerService,
    private cS: CarsService,
    private rout: Router,
    private modalService: BsModalService) {  }

  ngOnInit(): void {
    this.sharedata.sendMessage(this.message);
    this.getCars();
  };

  getCars() {
    
    this.spinner.show();
    this.cS.getAllCars().subscribe((res) => {
      
      if (res.status == 200) {
        this.spinner.hide();
        this.carDetails = res.data;
        this.totalPages = Math.ceil(this.carDetails.length / this.recordsPerPage);
        const startIndex = (this.pageNumber - 1) * this.recordsPerPage;
        this.displayLogRecords = this.carDetails?.slice(startIndex, startIndex + this.recordsPerPage);
        console.log("All data " + this.carDetails)
      }
      else {
        console.log(" Failed to fetch Details ");
      }
    });
  };

  pagination(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.pageNumber = page;
      this.getCars();
    }
  }

  searchCar(event) {
      this.getCars();
    if (this.search.length == 0) {
      this.getCars();
    }
  }

  editCar(id: any) {
    this.rout.navigateByUrl(`/dashboard/cars/updatecar/${id}`)
  };

  viewCar(id: any) {
    this.rout.navigateByUrl(`/dashboard/cars/carview/${id}`)
  }

updatedId(id:number){
  this.currentId=id;
}
  deleteCar() {
    this.spinner.show();
    this.cS.removeCarDetails(this.currentId).subscribe((res) => {
      console.log("Details Deleted" + res.data);
      this.getCars();
      this.spinner.hide();
    })
  }

  selectAll() {
    this.isChecked = true;
    this.isCheckedAll = true;
  }

  reloadComponent() {
    this.search = '';
    this.isChecked = false;
    this.isCheckedAll = false;
    this.spinner.show();
    this.getCars();
    this.carDetails.forEach((car) => {
      car.vehicalDetails.isChecked = false;
    })
  }

  checkUncheckAll(event) {
    
    this.isCheckedAll = event.target.checked
    if (this.isCheckedAll == true)
      this.isChecked = true;
    else
      this.isChecked = false;
    this.carDetails.forEach((car) => {
      if (this.isCheckedAll == true) {
        car.vehicalDetails.isChecked = true;
      }
      else
        car.vehicalDetails.isChecked = false;
    })
    // this.getCars();
  }

  isAllSelected(event, id) {
    var currentCar = this.carDetails.find((car) => car.vehicalDetails.id == id)
    currentCar.vehicalDetails.isChecked = event.target.checked;
    this.isChecked = this.carDetails.some(car => car.vehicalDetails.isChecked);
  }

  DeleteMultipleCars() {
    this.carDetails.forEach((car) => {
      if (car.vehicalDetails.isChecked == true) {
        this.updatedId(car.vehicalDetails.id);
        this.deleteCar();
      }
    })
  }

  // getsortValue(evt) {
  //   this.sort = evt.target.innerHTML;
  //   this.getCars();
  // }

}
