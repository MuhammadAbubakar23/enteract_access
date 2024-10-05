import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccessPoint } from 'src/app/layouts/shared/models/AccessPointDto';
import { Accesspoint_Devices_Dto } from 'src/app/layouts/shared/models/Accesspoint_devices';
import { AccesspointService } from 'src/app/services/accesspointservice/accesspoint.service';
import { CityService } from 'src/app/services/CityService/city.service';
import { DatashareService } from 'src/app/services/datashareservice/datashare.service';
import { DeviceService } from 'src/app/services/deviceservice/device.service';
import { FloorService } from 'src/app/services/floorservice/floor.service';
import { LocationService } from 'src/app/services/locationservices/location.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-createaccesspoint',
  templateUrl: './createaccesspoint.component.html',
  styleUrls: ['./createaccesspoint.component.css']
})
export class CreateaccesspointComponent implements OnInit {

  locations: any;
  Floors: any;
  Cities: any;
  city_Id: any;
  loc_Id: any;
  devices: any;
  deviceobj: Accesspoint_Devices_Dto = new Accesspoint_Devices_Dto();
  devicearr: any[] = [];
  deviceId: any = 0;
  perArray: any[] = [];

  id: any = 0;
  Type:any;

  // message: string[] = ["Access Point", "Create Access Point", "Locations", "Access Points", "/dashboard/listoflocations", "/dashboard/listofaccesspoints", "fal fa-map-marker-alt", "fal fa-badge-check", "fal fa-badge-check", "/dashboard/listofaccesspoints", "/dashboard/listofaccesspoints/createaccesspoint", "breadcrumb-item active"];

  message : any = {
    title: "Access Point",
    Icon: "fal fa-map-marker-alt",
    subTitle: "Create Access Point",
    Url: "/dashboard/listofaccesspoints"
  }

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

  constructor(private locService: LocationService,
    private floorService: FloorService,
    private accesspointService: AccesspointService,
    private router: Router,
    private toastr: ToastrService,
    private cityService: CityService,
    private dataShare: DatashareService,
    private deviceService: DeviceService,
    private formbuilder: FormBuilder,
    private spinner: NgxSpinnerService,) { 
      this.spinner.show();
      setTimeout(() => {
        this.spinner.hide();
      }, 4000);
    }

  ngOnInit(): void {
    this.getAllLocations();
    this.getAllFloors();
    this.getAllCities();
    this.dataShare.sendMessage(this.message);
    this.getAllDevices();
    console.log("Device Array===>", this.accesspoint.devices);

    this.accesspointForm = this.formbuilder.group({
      Name: ['',[Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      Alias: ['',[Validators.required]],
      City_Id: ['',[Validators.required]],
      Location_Id: ['',[Validators.required]],
      Floor_Id: ['',[Validators.required]],
      AccessPoint_Devices: ['',[Validators.required]],
      
    })

  }


  getAllDevices() {
    this.deviceService.getDevicesWithoutFilters().subscribe((res: any) => {
      this.devices = res.data;
      console.log("Devices", res.data.result);
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
      console.log(res);
      this.Cities = res.data;
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
    
    let item = this.devicearr.find(f => f.Device_Id == id);
    if (item) {
      return false;
    }
    let obj = { "Device_Id": Number(id), "accessPoint_Id": 0, "type": this.Type}
    this.devicearr.push(obj);
    // console.log(this.devicearr);
    return true;
  }

  AddAccessPoint() {
    


    this.accesspointForm.value.AccessPoint_Devices = this.devicearr;
    this.accesspointService.Add(this.accesspointForm.value).subscribe(
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

  OutDevicesControl = new FormControl([null, Validators.required]);
  OutDevices: string[] = [];

  onCatRemovedOutDevices(cat: string) {
    
    // for (var i = 0; i <= this.perArray.length; i++) {
    //   if (this.perArray[i] == cat) {
    //     this.perArray.splice(i, 1);
    //   }
    //   console.log(this.perArray)
    // }
    const OutDevices = this.OutDevicesControl.value as string[];
    this.removeFirst(OutDevices, cat);
    this.OutDevicesControl.setValue(OutDevices); // To trigger change detection
  }

  private removeFirst(array: any[], toRemove: any): void {
    
    const index = array.indexOf(toRemove);
    if (index !== -1) {
      array.splice(index, 1);
    }
  }
}
