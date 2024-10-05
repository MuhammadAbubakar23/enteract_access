import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Permission } from 'src/app/layouts/shared/models/PermissionsDto';
import { AccesspointService } from 'src/app/services/accesspointservice/accesspoint.service';
import { DatashareService } from 'src/app/services/datashareservice/datashare.service';
import { FloorService } from 'src/app/services/floorservice/floor.service';
import { LocationService } from 'src/app/services/locationservices/location.service';
import { PermissionService } from 'src/app/services/permissionService/permission.service';


@Component({
  selector: 'app-createpermission',
  templateUrl: './createpermission.component.html',
  styleUrls: ['./createpermission.component.css']
})
export class CreatepermissionComponent implements OnInit {

  Locations: any;
  Floors: any[] = [];
  permission = new Permission();
  AccessPoint: any[] = [];

  id: any;
  loc_id: any = 0;




  permissionForm = new FormGroup({
    Id: new FormControl(this.permission.id),
    Name: new FormControl(this.permission.name),
    Location_Id: new FormControl(this.permission.location_Id),
    Description: new FormControl(this.permission.description),
    Floor_Id: new FormControl(this.permission.Floor_Id),
    AccessPoint_Id: new FormControl(this.permission.AccessPoint_Id),
    Device_Id: new FormControl(this.permission.Device_Id),
    is_Bio: new FormControl(this.permission.is_Bio),
    is_RFID: new FormControl(this.permission.is_RFID),
    is_Face: new FormControl(this.permission.is_Face),


  })

  // message: string[] = ["Permissions", "Create Permission", "", "", "", "", "", "", "fal fa-business-time", "/dashboard/listofpermissions", "/dashboard/listofpermissions/createpermission","breadcrumb-item active"]

  message: any = {
    title: "Permissions",
    Icon: "fal fa-business-time",
    subTitle: "Create Permission",
    Url: "/dashboard/listofpermissions"
  }
  constructor(private locationService: LocationService,
    private floorService: FloorService,
    private dataShare: DatashareService,
    private router: Router,
    private toaster: ToastrService,
    private accessService: AccesspointService,
    private permissionService: PermissionService,
    private formbuilder: FormBuilder, private spinner: NgxSpinnerService,) {
      this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 4000);
  }

  ngOnInit(): void {
    this.getAllLocations();
    this.dataShare.sendMessage(this.message);

    // this.permissionForm = this.formbuilder.group({
    //   Name: ['',[Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
    //   Description: ['',[Validators.required]],

    // })
  }




  getfilteredData(id: any) {
    
    this.accessService.getByLoc(id).subscribe((res: any) => {
      this.AccessPoint = res.data;
      console.log(this.AccessPoint)

    },
      err => {

      })

  }

  getAllLocations() {
    this.locationService.getAllLocations().subscribe((res: any) => {
      this.Locations = res.data;
    },
      err => {

      }
    )
  }

  getAllFloors() {

    this.floorService.getAllByLocation(this.loc_id).subscribe((res: any) => {
      this.Floors = res.data;

      this.Floors.forEach(element => {

        element.accesspoint.forEach(accesspoint => {
          accesspoint.isMasterSelectAll = false;

        });
      })

      console.log("Floors====>", this.Floors);
      this.Floors.forEach((e: any) => {
        e.accesspoint.forEach((d: any) => {
          console.log("devicesss=====>", d.devices)
        });
      })


    },
      err => {

      }
    )
  }


  addPermission(floorid: number, Device_Id: number, AccessPoint_Id: Number, bio: any, rfid: any, face: any) {
    ;
    let checkexist = this.AccessPoint.find(x => x.Floor_Id == floorid && x.Device_Id == Device_Id)
    let isbio;
    let isrfid;
    let isface;
    if (checkexist == undefined) {
      if (bio != "") {
        isbio = bio.target.checked;

      } else {
        isbio = false
      }
      if (rfid != "") {
        isrfid = rfid.target.checked;
      } else {
        isrfid = false
      }

      if (face != "") {
        isface = face.target.checked;
      } else {
        isface = false
      }
      let obj22 = {
        "Id": 0, "Name": this.permissionForm.value.Name, "Location_Id": this.permissionForm.value.Location_Id,
        "Description": this.permissionForm.value.Description, "Floor_Id": floorid, "AccessPoint_Id": AccessPoint_Id,
        "Device_Id": Device_Id, "is_Bio": isbio, "is_RFID": isrfid, "is_Face": isface
      }

      this.AccessPoint.push(obj22)
    } else {
      let checkexistindex = this.AccessPoint.findIndex(x => x.Floor_Id == floorid && x.Device_Id == Device_Id)
      if (bio != "") {
        checkexist.is_Bio = bio.target.checked;
      }
      if (rfid != "") {
        checkexist.is_RFID = rfid.target.checked;
      }
      if (face != "") {
        checkexist.is_Face = face.target.checked;
      }


      this.AccessPoint[checkexistindex] = checkexist

    }


    console.log(this.AccessPoint);
  }


  CreatePermission() {
    
    this.permissionService.Add(this.AccessPoint).subscribe((res: any) => {
      this.toaster.success("Successfully Created", "Success");
      this.router.navigateByUrl("/dashboard/listofpermissions");
    })
  }

  isChecked = false;
  // isCheckedAll = false;
  isMasterSelectAll: any = false;


  checkUncheckAll(evt, indexaccess, indexfloor) {

    let floorF;
    floorF = this.Floors[indexfloor];
    let filter;
    filter = floorF.accesspoint[indexaccess];
    filter.devices.forEach((c) => c.isChecked = evt.target.checked)

    if (filter.devices.every((c) => c.isChecked == true)) {

      filter.isMasterSelectAll = true;
    }
    else {
      filter.isMasterSelectAll = false;

    }



  }

  // maskSelectedPermission(){
  //   let permissions = [];
  //   permissions.forEach(elemen => {
  //     var florr = this.Floors.filter(f => f.Id == elemen.floor_Id)[0];
  //     var g = florr["accesspoint"].filter(g => g.Id == elemen.accessPoint_Id);
  //     g.devices.file
  //   })
  // }

  isAllSelected(evt, index, indexaccess, indexfloor) {




    let floorF;
    floorF = this.Floors[indexfloor];
    let filter;
    filter = floorF.accesspoint[indexaccess];
    filter.devices[index].isChecked = evt.target.checked



    if (filter.devices.every((c) => c.isChecked == true)) {

      filter.isMasterSelectAll = true;
    }
    else {
      filter.isMasterSelectAll = false;

    }

  }

}
