import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AccessPoint } from 'src/app/layouts/shared/models/AccessPointDto';
import { AccesspointService } from 'src/app/services/accesspointservice/accesspoint.service';
import { CityService } from 'src/app/services/CityService/city.service';
import { DatashareService } from 'src/app/services/datashareservice/datashare.service';
import { DeviceService } from 'src/app/services/deviceservice/device.service';
import { FloorService } from 'src/app/services/floorservice/floor.service';
import { LocationService } from 'src/app/services/locationservices/location.service';

@Component({
  selector: 'app-editaccesspoint',
  templateUrl: './editaccesspoint.component.html',
  styleUrls: ['./editaccesspoint.component.css']
})
export class EditaccesspointComponent implements OnInit {

  locations: any;
  Floors: any;
  Cities: any;
  city_Id: any = 0;
  loc_Id: any = 0;
  id = this.activatedRoute.snapshot.params["id"];
  numId = Number(this.id);
  // message: string[] = ["Access Point", "Edit Access point", "Locations", "Access Points", "/dashboard/listoflocations", "/dashboard/listofaccesspoints", "fal fa-map-marker-alt", "fal fa-badge-check", "fal fa-badge-check", "/dashboard/listofaccesspoints", "/dashboard/listofaccesspoints/editaccesspoint/","breadcrumb-item active"];
  
  message : any = {
    title: "Access Point",
    Icon: "fal fa-map-marker-alt",
    subTitle: "Edit Access point",
    Url: "/dashboard/listofaccesspoints"
  }
  
  Type:any;
  devicearr: any[] = [];
  accesspoint = new AccessPoint();

  accesspointForm = new FormGroup({
    Id: new FormControl(this.accesspoint.id),
    Name: new FormControl(this.accesspoint.name),
    Alias: new FormControl(this.accesspoint.alias),
    City_Id: new FormControl(this.accesspoint.City_Id),
    Location_Id: new FormControl(this.accesspoint.location_Id),
    Floor_Id: new FormControl(this.accesspoint.floor_Id),
    AccessPoint_Devices: new FormControl()
  })
  devices: any;

  constructor(private locService: LocationService,
    private floorService: FloorService,
    private accesspointService: AccesspointService,
    private router: Router,
    private toastr: ToastrService,
    private cityService: CityService,
    private activatedRoute: ActivatedRoute,
    private deviceService: DeviceService,
    private dataShare: DatashareService,
    private formbuilder : FormBuilder,
    private spinner: NgxSpinnerService,) { 
      this.spinner.show();
      setTimeout(() => {
        this.spinner.hide();
      }, 4000);
    }

  ngOnInit(): void {

    this.getAllLocations();
    this.getAllDevices();
    this.getAllFloors();
    this.getAllCities();
    this.getById();
    this.dataShare.sendMessage(this.message);

    this.accesspointForm = this.formbuilder.group({
      Name: ['',[Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      Alias: ['',[Validators.required]],
      City_Id: ['',[Validators.required]],
      Location_Id: ['',[Validators.required]],
      Floor_Id: ['',[Validators.required]],
      AccessPoint_Devices: ['',[Validators.required]],
      Id: [],
 
      
    })


  }


  getAllDevices() {
    this.deviceService.getDevicesWithoutFilters().subscribe((res: any) => {
      this.devices = res.data;
    })

  }

  getAllLocations() {
    this.locService.getLocByCity(this.city_Id).subscribe((res: any) => {
      this.locations = res.data;
    })
  }


  getAllFloors() {
    this.floorService.getAllByLocation(this.loc_Id).subscribe((res: any) => {
      this.Floors = res.data;

    })
  }

  getAllCities() {
    this.cityService.getAll().subscribe((res: any) => {
      this.Cities = res.data;
    })

  }

  getById() {
    
    this.accesspointService.getById(this.numId).subscribe((res: any) => {
      console.log("THis is edit access===>", res.data.accessDevices);
      this.devicearr=res.data.accessDevices;
      console.log("Array after get by id====>",this.devicearr);
      this.accesspointForm.patchValue({
        Id: res.data.accesspoint.id,
        Name: res.data.accesspoint.name,
        Alias: res.data.accesspoint.alias,
        City_Id: res.data.city.id,
        Location_Id: res.data.location.id,
        Floor_Id: res.data.floors.id,
        AccessPoint_Devices:res.data.accessDevices
      }
      )
      console.log("form====>", this.accesspointForm);
      this.devicearr=[];
    })
  }


  getInVal(id:any){
    let valofINN=document.getElementById("INN");
    this.Type=valofINN.id;
    this.populateId(id);
  }

  getOutVal(id:any){
    let valofOut=document.getElementById("OUT");
    this.Type=valofOut.id;
    this.populateId(id);

  }
  
  populateId(id: any) {
    
    let item = this.devicearr.find(f => f.id == id);
    if (item) {
      return false;
    }
    let obj = { "Device_Id": Number(id), "accessPoint_Id": 0, "type": this.Type };
    this.devicearr.push(obj);
    console.log("devicearr===>", this.devicearr)
    return true;
  }

  EditAccessPoint() {
    console.log("Hello Usman");
    this.accesspointForm.value.AccessPoint_Devices = this.devicearr;
    this.accesspointService.Update(this.accesspointForm.value).subscribe(
      (res: any) => {
        console.log(res.data);
        this.router.navigateByUrl("/dashboard/listofaccesspoints");
        this.toastr.success("Access point is added", "Success");
      },
      err => {
        this.toastr.error("Something went wrong", "Error");
      }
    )

  }

  // Type:any;
  // getInVal(id:any){
  //   let valofINN=document.getElementById("INN");
  //   this.Type=valofINN.id;
  //   //this.populateId(id);

  //   
  //   let finalval;
  //   // let valofINN=document.getElementById("INN");
  //   finalval=valofINN.id;
  //   let valofOut=document.getElementById("OUT");
  //   finalval=valofOut.id;
  //   let item = this.devicearr.find(f => f.id == id);
  //   if (item) {
  //     return false;
  //   }
  //   let obj = { "Device_Id": Number(id), "accessPoint_Id": 0, "type": finalval };
  //   this.devicearr.push(obj);
  //   console.log("devicearr===>", this.devicearr)
  //   return true;

  
  // }

  InDevicesControl = new FormControl([null, Validators.required]);
  InDevices: string[] = [];

  onCatRemovedInDevices(cat: string) {
    
    // for (var i = 0; i <= this.perArray.length; i++) {
    //   if (this.perArray[i] == cat) {
    //     this.perArray.splice(i, 1);
    //   }
    //   console.log(this.perArray)
    // }
    const InDevices = this.InDevicesControl.value as string[];
    this.removeFirst(InDevices, cat);
    this.InDevicesControl.setValue(InDevices); // To trigger change detection
  }

   private removeFirst(array: any[], toRemove: any): void {
    
    const index = array.indexOf(toRemove);
    if (index !== -1) {
      array.splice(index, 1);
    }
  }

}
