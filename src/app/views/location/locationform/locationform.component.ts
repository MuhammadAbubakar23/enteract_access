import { Component, OnInit, Input } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Location } from 'src/app/layouts/shared/models/LocationDto';
import { CityService } from 'src/app/services/CityService/city.service';
import { DatashareService } from 'src/app/services/datashareservice/datashare.service';
import { LocationService } from 'src/app/services/locationservices/location.service';

@Component({
  selector: 'app-locationform',
  templateUrl: './locationform.component.html',
  styleUrls: ['./locationform.component.css']
})
export class LocationformComponent implements OnInit {

  Cities:any;

  location:Location=new Location()

  locationForm=new FormGroup({
    Id:new FormControl(this.location.id),
    Name:new FormControl(this.location.name),
    Floor: this.formbuilder.array([
      this.formbuilder.control('',Validators.required)
    ]),
    Address:new FormControl(this.location.address),
    //Longitude:new FormControl(this.location.longitude),
    City_Id:new FormControl(this.location.city_Id),
    //Latitude:new FormControl(this.location.latitude),
    Building_Type:new FormControl(this.location.building_type),
    Area: new FormControl(),
    Country:new FormControl(this.location.country)
  })

  @Input() mode=""
  @Input() message=[]

  constructor(public locService:LocationService,
              public router:Router,
              public toaster:ToastrService,
              public cityService:CityService,
              private dataShare:DatashareService,
              private formbuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getAllCities();
    this.dataShare.sendMessage(this.message);

  //   this.locationForm = this.formbuilder.group({
  //     Name: ['',[Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
  //     Building_Type: ['',[Validators.required]],
  //     Area: ['',[Validators.required]],
  //     City_Id: ['',[Validators.required]],
  //     Address: ['',[Validators.required]],

  //   })
   }

  addlatlong(newItem: any) {
    console.log("Lat",newItem.coords.lat);
    console.log("lng",newItem.coords.lng);
    this.locationForm.patchValue({
      Latitude:newItem.coords.lat,
      Longitude:newItem.coords.lng,
    })
  }

  getAllCities(){
    this.cityService.getAll().subscribe(
      (res:any)=>{
        console.log(res.data);
        this.Cities=res.data;
      },
      err=>{
        this.toaster.error("Something went wrong","Error");
      }
    )
  }
  get floors(){
    return this.locationForm.get('Floor') as FormArray
  }
  addFloor(){
    this.floors.push(new FormControl(''))
  }
  removeFloor(index:any){
    console.log("index",index)
    this.floors.removeAt(index)
  }
  submitform(){
    if(this.mode==="create"){
      this.addLocation()
    }
    if(this.mode==="update"){
      this.updateLocation()
    }
  }
  addLocation(){
    
    this.locService.Add(this.locationForm.value).subscribe((res:any)=>{
      this.toaster.success("Location is added Successfully","Success")
      this.router.navigateByUrl("/dashboard/listoflocations")

    },
    err=>{
      this.toaster.error("Something went wrong","Error");
      console.log(err);
    })
  }
  updateLocation(){
    
    this.locService.Update(this.locationForm.value).subscribe((res:any)=>{
      this.toaster.success("Updated Successfully","Success"),
      this.router.navigateByUrl("/dashboard/listoflocations")

    })
  }

}
