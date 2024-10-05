import { validateHorizontalPosition } from '@angular/cdk/overlay';
import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Device } from 'src/app/layouts/shared/models/DeviceDto';
import { DatashareService } from 'src/app/services/datashareservice/datashare.service';
import { DeviceService } from 'src/app/services/deviceservice/device.service';

@Component({
  selector: 'app-deviceform',
  templateUrl: './deviceform.component.html',
  styleUrls: ['./deviceform.component.css']
})
export class DeviceformComponent implements OnInit {
  device: Device = new Device();
  deviceData: any;
  id = this.activatedRoute.snapshot.params["id"];
  deviceid = Number(this.id);
  checkbox: boolean = false;
  toastermessage = false;
  Make :number
  @Input() message = [];
  @Input() mode = "";
  //message: string[] = ["Devices", "Create Device", "", "", "", "", "", "", "fal fa-desktop", "devicemanagement/listofdevices", "devicemanagement/createdevice","breadcrumb-item active"]

  constructor(private deviceService: DeviceService,
    public router: Router,
    private toaster: ToastrService,
    private dataShare: DatashareService,
    private activatedRoute: ActivatedRoute,
  ) { }


  ngOnInit(): void {
    this.getLocation()
    console.log("mode==>", this.mode);
    if (this.mode == "update") {
      this.getDeviceById(this.deviceid);
    }
    this.dataShare.sendMessage(this.message);
  }

  deviceForm = new FormGroup({
    Id: new FormControl(this.device.id),
    Name: new FormControl(this.device.name, [Validators.required, Validators.minLength(2), Validators.maxLength(25)]),
    Make: new FormControl(this.device.make, [Validators.required]),
    Modal: new FormControl(this.device.modal, [Validators.required]),
    SerialNo: new FormControl(this.device.serialNo, ),
    //DeviceType: new FormControl(this.device.deviceType),
    //Username: new FormControl(this.device.username,[Validators.required, Validators.minLength(2), Validators.maxLength(25)]),
    //Mode: new FormControl(this.device.mode, [Validators.required]),
    is_Face: new FormControl(this.device.is_Face),
    is_Bio: new FormControl(this.device.is_Bio),
    is_RFID: new FormControl(this.device.is_RFID),
    MachineNo: new FormControl(this.device.machineno ,[Validators.required]),
    MachinePassCode: new FormControl(this.device.machinepasscode,[Validators.required]),
    IP: new FormControl(this.device.iP,[ Validators.required,Validators.pattern('(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)') ]),
    Port: new FormControl(this.device.port, [Validators.required ,]),
    RemoteUrl: new FormControl(this.device.remoteurl,[Validators.required,Validators.pattern('(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)')]),
    DeviceToken: new FormControl(this.device.devicetoken),
    Location:new FormControl('',[Validators.required])
    //City: new FormControl(this.device.city),
    //Address: new FormControl(this.device.address, [Validators.required]),

    //SecurityLevel: new FormControl(this.device.securityLevel),
    //ResourceType: new FormControl(this.device.resourceType),
    //Password: new FormControl(this.device.password, [Validators.required]),

  })
  changelocationid:any
  ischageloctionIdnumber:number
  submitForm() {
   

    if (this.mode =="create") {
    {
         
        let data = {
          "name": this.deviceForm.value.Name,
          "make": this.deviceForm.value.Make,
          "modal": this.deviceForm.value.Modal,
          "serialNumber": this.deviceForm.value.SerialNo,
          "is_Face": this.deviceForm.value.is_Face,
          "is_Bio": this.deviceForm.value.is_Bio,
          "is_RFID": this.deviceForm.value.is_RFID,
          "userName": this.deviceForm.value.MachineNo,
          "password": this.deviceForm.value.MachinePassCode,
          "ip": this.deviceForm.value.IP,
          "port": this.deviceForm.value.Port,
          "address": this.deviceForm.value.RemoteUrl,
          "deviceToken": this.deviceForm.value.DeviceToken,
          "mode":"	IP/Domain",
          "locationId":Number(this.deviceForm.value.Location)
        }
       
         
        this.deviceService.addDevice(data).subscribe(res => {
          console.log("Inserting device", data)
          this.router.navigateByUrl("/dashboard/devicemanagement/listofdevices"),
            this.toaster.success("Device added Successfully", "Success")
        },
          err => {
            this.toaster.error("Something went wrong", "error")
          })
      }
    }

    else (this.mode =="update") 
    {
    let  data = {
      "id" : this.activatedRoute.snapshot.params["id"],
        "name": this.deviceForm.value.Name,
        "make": this.deviceForm.value.Make,
        "modal": this.deviceForm.value.Modal,
        "is_Face": this.deviceForm.value.is_Face,
        "is_Bio": this.deviceForm.value.is_Bio ,
        "is_RFID": this.deviceForm.value.is_RFID,
        "userName": this.deviceForm.value.MachineNo,
        "password": this.deviceForm.value.MachinePassCode,
        "ip": this.deviceForm.value.IP,
        "port": this.deviceForm.value.Port,
        "address": this.deviceForm.value.RemoteUrl,
        "mode":"	IP/Domain",
        "locationId":Number(this.deviceForm.value.Location)
      }
    
      
      this.deviceService.updateDevice(data).subscribe(res => {
        this.router.navigateByUrl("/dashboard/devicemanagement/listofdevices")
        console.log("the update value ====> ",data)
        if(this.mode =="update"){
          this.toaster.success("Device updated Successfully", "Success")
        }

      },
        err => {
          this.toaster.error("something went wrong", "Error")
        })
      // this.deviceService.updateDevice(data).subscribe((res:any)=>{
      //   this.toaster.success("Device updated Successfully","Success")
      //   this.router.navigateByUrl("/dashboard/devicemanagement/listofdevices")
      // })
    }
  }
 

  editDevice() {
   
  }
  getDeviceById(id: any) {
    
    console.log("get Id", this.deviceid)
    this.deviceService.getDevice(id).subscribe((res: any) => {
      console.log("date is comeing form edit api===>", res.data);
      

      this.deviceForm.patchValue({
       
        Name: res.data.name,
        Make: res.data.make ,
        Modal: res.data.modal,
        is_Face: res.data.type[0].is_Face,
        is_Bio:res.data.type[0].is_Bio,
        is_RFID:res.data.type[0].is_RFID ,

        MachineNo : res.data.userName,
        MachinePassCode: res.data.password,
        IP: res.data.network,
        Port: res.data.port,
        RemoteUrl : res.data.network,
      

      });
      console.log("The make of res.date is ===>#", )
    })
  }
  location:any;
getLocation(){
  this.deviceService.getDeviceLocation().subscribe((res:any)=>{
 this.location=res.data
 console.log("this.location===>",this.location)
  })
}


  toasterMsg() {
    this.toastermessage = true;

    setTimeout(() => {
      this.toastermessage = false;
      this.router.navigateByUrl("/dashboard/devicemanagement/listofdevices")
    }, 2000);
  }

  closeToaster() {
    this.toastermessage = false
  }

}
