import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { LocationService } from 'src/app/services/locationservices/location.service';

@Component({
  selector: 'app-locationdetail',
  templateUrl: './locationdetail.component.html',
  styleUrls: ['./locationdetail.component.css']
})
export class LocationdetailComponent implements OnInit {
  location_details: any;
  id = this.activatedRoute.snapshot.params["id"];

  numId = Number(this.id);
  constructor(private activatedRoute: ActivatedRoute,
    private locationService: LocationService, private spinner: NgxSpinnerService,) {
      this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 4000);
  }

  ngOnInit(): void {
    this.getLocationById()
  }


  getLocationById() {
    this.locationService.getbyId(this.numId).subscribe((res: any) => {
      this.location_details = res.data;
      console.log("location_Details===>", this.location_details)
    })


  }

  // userForm : FormGroup = new FormGroup({

  //   roles : new FormControl(),
  // });

  LocationDetails = new FormControl([]);
  Floors: string[] = [];

  onCatRemovedFloor(cat: string) {
    
    const Floors = this.LocationDetails.value as string[];
    this.removeFirst(Floors, cat);
    this.LocationDetails.setValue(Floors); // To trigger change detection
  }

  private removeFirst(array: any[], toRemove: any): void {

    const index = array.indexOf(toRemove);
    if (index !== -1) {
      array.splice(index, 1);
    }
  }
}
