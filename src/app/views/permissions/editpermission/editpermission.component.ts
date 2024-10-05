import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Permission } from 'src/app/layouts/shared/models/PermissionsDto';
import { DatashareService } from 'src/app/services/datashareservice/datashare.service';
import { FloorService } from 'src/app/services/floorservice/floor.service';
import { LocationService } from 'src/app/services/locationservices/location.service';
import { PermissionService } from 'src/app/services/permissionService/permission.service';

@Component({
  selector: 'app-editpermission',
  templateUrl: './editpermission.component.html',
  styleUrls: ['./editpermission.component.css']
})
export class EditpermissionComponent implements OnInit {

  // message:string[]=["Permissions","Edit Permission","","","","","","","fal fa-business-time","","","breadcrumb-item active"];

  message: any = {
    title: "Permissions",
    Icon: "fal fa-business-time",
    subTitle: "Edit Permission",
    Url: "/dashboard/listofpermissions"
  }
  permission = new Permission();
  Locations: any;
  Floors: any;
  loc_id: any = 0;
  AccessPoint: any[] = [];

  name = this.activatedRoute.snapshot.params['name'];

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

  constructor(private dataShare: DatashareService,
    private locationService: LocationService,
    private floorService: FloorService,
    private activatedRoute: ActivatedRoute,
    private permissionService: PermissionService, private spinner: NgxSpinnerService,) {
      this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 4000);
  }



  ngOnInit(): void {
    this.dataShare.sendMessage(this.message);
    this.getPermissionById();
    // this.getAllFloors();
    this.getAllLocations();
  }


  getPermissionById() {
    
    this.permissionService.getByName(this.name).subscribe((res: any) => {

      this.permission = res.data;
      console.log("This is permission data===>", this.permission);
      this.permissionForm.patchValue({
        Id: res.data.result.Details.id,
        Name: res.data.result.Details.name,
        Location_Id: res.data.result.Details.locationId,
        Description: res.data.result.Details.description,
        Floor_Id: res.data.result.Floor_Id,
        AccessPoint_Id: res.data.result.AccessPoint_Id,
        Device_Id: res.data.result.Device_Id,
        is_Bio: res.data.result.is_Bio,
        is_RFID: res.data.result.is_RFID,
        is_Face: res.data.result.is_Face
      })

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

  getAllFloors(id: any) {
    

    this.floorService.getAllByLocation(id).subscribe((res: any) => {
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

  editPermission() { }


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
