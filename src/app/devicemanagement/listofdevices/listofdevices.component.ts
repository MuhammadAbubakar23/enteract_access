import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { DatashareService } from 'src/app/services/datashareservice/datashare.service';
import { DeviceService } from 'src/app/services/deviceservice/device.service';

@Component({
  selector: 'app-listofdevices',
  templateUrl: './listofdevices.component.html',
  styleUrls: ['./listofdevices.component.css']
})
export class ListofdevicesComponent implements OnInit, OnDestroy {
  mySubscription: any;
  devicetypes: any[] = [];
  objectKeys = Object.keys;
  devices: any[] = [];
  statusdevice: any[] = [];
  name: any;
  search: any = "";
  make: any = "";
  p: any = 1;
  itemsPerPage: any = "5";
  text = ""
  pageNumber = 1
  totalPages: any;
  totalDevicesCount: any;
  Starting_Point: any;
  Ending_Point: any;
  type: any = "";
  status: any = "";
  Ids: any[] = [];
  currentPage: any;
  sort: string = "";
  // message: string[] = ["Devices", "", "", "", "", "", "", "", "fal fa-desktop", "devicemanagement/listofdevices"]

  message: any = {
    title: "Devices",
    Icon: "fal fa-desktop",
    subTitle: "",
    Url: "devicemanagement/listofdevices"
  }
  devicesstatus: any[] = [
    {
      title: 'Total Devices',
      count: this.devices.length,
      icon: 'fa-light fa-desktop',
      color: 'oceanBg'
    },
    {
      title: 'Online Devices',
      count: 0,
      icon: 'fa-light fa-check',
      color: 'emeraldBg'
    },
    {
      title: 'Offline Devices',
      count: 0,
      icon: 'fa-light fa-triangle-exclamation',
      color: 'caolBg'
    },
    {
      title: 'Disabled Devices',
      count: 0,
      icon: 'fa-light fa-ban',
      color: 'radicalBg'
    }
  ];
  modalRef: BsModalRef
  constructor(private devServices: DeviceService,
    private router: Router,
    private toaster: ToastrService,
    private sharedata: DatashareService,
    private SpinnerService: NgxSpinnerService,
    private modalService: BsModalService
  ) {

    this.SpinnerService.show();
    setTimeout(() => {
      this.SpinnerService.hide();
    }, 4000);

  }


  ngOnInit(): void {
    
    this.getAllDevices();
    this.sharedata.sendMessage(this.message);
    this.make = this.devServices.filter.make;
    this.type = this.devServices.filter.type;
    this.status = this.devServices.filter.status;
    this.search = this.devServices.filter.search;

  }

  ngOnDestroy(): void {
    
    this.devServices.filter.make = this.make;
    this.devServices.filter.type = this.type;
    this.devServices.filter.status = this.status;
    this.devServices.filter.search = this.search;
  }

  devicesStatus() {
    var online = 0
    var offline = 0
    var disabled = 0

    this.statusdevice.forEach((device: any) => {

      if (device.status == "Active") {
        online++;

      }
      if (device.status == "InActive") {
        offline++;
      }

      if (device.status == "disabled") {
        disabled++;
      }
    })

    this.devicesstatus[0].count = this.statusdevice.length
    this.devicesstatus[1].count = online
    this.devicesstatus[2].count = offline
    this.devicesstatus[3].count = disabled

  }

  showspinner() {
    
    this.SpinnerService.show();
    setTimeout(() => {
      this.SpinnerService.hide()
    }, 4000);
  }
  deviceType = [];
  getAllDevices() {
    var data = {
      Search: this.search,
      Page_No: this.p,
      ItemsPerPage: this.itemsPerPage,
      Make: this.make,
      Type: this.type,
      Status: this.status,
      Sort: this.sort
    }
    this.SpinnerService.show();

    
    this.devServices.getDevices(data).subscribe((res: any) => {
      
      console.log("data the enter===>", data)
      console.log("res===>", res.data)
      res.data.paginatedDevices.forEach((devices: any) => {
        console.log("the devices", res)

        var devicesTypes = [];
        var obj = {
          "Face": devices.type[0].is_Face,
          "Bio": devices.type[0].is_Bio,
          "RFID": devices.type[0].is_RFID
        }
        devicesTypes.push(obj);
        devices.type = devicesTypes
        devices.type.forEach((type: any) => {
          if (type.Face === false) {
            delete type.Face
          }
          if (type.Bio === false) {
            delete type.Bio
          }
          if (type.RFID === false) {
            delete type.RFID
          }
          console.log("DEvices.Type===>", type)
        })
      })

      this.devices = res.data.paginatedDevices
      this.statusdevice = res.data.totalDevices

        // this.devices=res.data.totalDevices

        ;
      this.deviceType = this.devices
      console.log("devices data", this.devices)

      this.devicesStatus();
      this.SpinnerService.hide();
      this.totalDevicesCount = res.data.totalDevices.length;
      this.totalPages = res.data.pagination.totalPages;
      this.currentPage = res.data.pagination.currentPage;

      // this.Starting_Point = res.data.pagination.starting_Point;
      // this.Ending_Point = res.data.pagination.ending_Point;

      // change the code 

      if (this.currentPage == 1) {
        this.Starting_Point = 1
      }
      else {
        this.Starting_Point = (res.data.pagination.currentPage - 1) * (res.data.pagination.pageSize) + 1
      }
      if (this.currentPage == this.totalPages) {
        this.Ending_Point = this.totalDevicesCount;

      }
      else {
        this.Ending_Point = this.Starting_Point + res.data.pagination.pageSize - 1

      }




    },
      err => {

      })
  }

  yesorNo: boolean = false;

  openModalNext(popupNext: TemplateRef<any>) {
    

    if (this.devices.find(x => x.isChecked == true) && (this.p < this.totalPages)) {
      this.modalRef = this.modalService.show(popupNext);
    }
    else {
      this.NextPage(this.p)
    }

  }
  openModalPrevious(popupPrevious: TemplateRef<any>) {

    if (this.devices.find(x => x.isChecked == true) && (this.p > 1)) {
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

  NextPage(currentPage: any) {


    let page = currentPage + 1;
    
    if (page < this.totalPages + 1) {
      this.p = page;
      if (this.devices.find(x => x.isChecked == true)) {
        this.isChecked = false;
        this.isCheckedAll = false;
        this.masterSelected = false;
      }
      this.getAllDevices();
    }
    this.currentPage;
  }
  PreviousPage(p: any) {
    
    if (p >= 1) {
      let page = p - 1;
      if (page > 0) {
        this.p = page;
        if (this.devices.find(x => x.isChecked == true)) {
          this.isChecked = false;
          this.isCheckedAll = false;
          this.masterSelected = false;
        }
        this.getAllDevices();
      }
    }

  }

  getDeviceByName() {

    if (this.search.length > 3) {
      this.getAllDevices();
    }
    else if (this.search.length === 0) {
      this.getAllDevices();
    }
  }

  getDeviceByMake() {

    this.getAllDevices()


  }

  getDeviceByStatus() {

    this.getAllDevices()

  }

  getDeviceByType() {


    this.getAllDevices()

  }

  getsortValue(evt) {
    
    this.sort = evt.target.innerHTML;
    this.getAllDevices();

  }
  deletedDevicesId: any[] = [];
  DeletedDevicesById(Ids: number[]) {
    this.deletedDevicesId = Ids

  }
  singelDeleted(id: any) {
    
    this.devServices.deleteDevice(id).subscribe((res: any) => {
      this.toaster.success("Record Deleted Successfully", "Success")
    })
  }
  Delete() {
    


    this.devServices.deleteDevice(this.Ids).subscribe(
      (res: any) => {
        
        // console.warn("Deleted devices to list ===>", this.Ids);  
        
        // if (Ids !== null) {
        //   this.devices = this.devices.filter((device) => {
        //     return device.id !== Ids;
        //   });

        // } 

        this.toaster.success("Record Deleted Successfully", "Success");
        this.getAllDevices();
        this.reloadComponent()
      },
      (err) => {
        this.toaster.error("Error occurred while deleting device", "Error");
      }
    );

  }



  deleteMultiple() {
    console.log("deleteMultiple", this.Ids)
    this.devServices.deletemultipledevices(this.Ids).subscribe(res => {
      this.toaster.success("Selected record deleted", "Success");
      this.getAllDevices();
    },
      err => {
        console.log(err);
      })

  }

  disableMultiple() {
    console.log("disableMultiple", this.Ids)
    this.devServices.disablemultipledevices(this.Ids).subscribe(res => {
      this.getAllDevices();
      this.toaster.success("Selected record deleted", "Success");
    },
      err => {
        console.log(err);
      })

  }

  navigateWithId(id: any) {
    this.router.navigateByUrl('/devicemanagement/createdevice')
  }



  isChecked = false;
  isCheckedAll = false;
  masterSelected = false;

  checkUncheckAll(evt) {
    
    this.devices.forEach((c) => { c.isChecked = evt.target.checked })
    this.masterSelected = this.devices.every((l) => l.isChecked == true);
    if (this.masterSelected == true) {
      
      this.devices.forEach((d) => {
        this.Ids.push(d.id);
      })
      this.isChecked = true;
      this.isCheckedAll = true;
    }
    else {
      this.devices.forEach((d) => {
        for (var i = 0; i <= this.Ids.length; i++) {
          if (this.Ids[i] == d.id) {
            this.Ids.splice(i, 1);
          }
        }
      })
      this.isChecked = false;
      this.isCheckedAll = false;
    }
  }

  isAllSelected(evt, index) {
    
    let id = Number(evt.target.value);
    if (index >= 0 && evt.target.checked == true) {
      this.Ids.push(id);
      console.log("the selected ids in Devices===>", this.Ids);
    }

    if (evt.target.checked == false) {
      for (var i = 0; i <= this.Ids.length; i++) {
        if (this.Ids[i] == id) {
          this.Ids.splice(i, 1);
        }

      }
      console.log(this.Ids)
    }


    this.devices[index].isChecked = evt.target.checked
    this.masterSelected = this.devices.every((l) => l.isChecked == true);

    let checkselectedlogs = this.devices.find(x => x.isChecked == true);
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

  toastermessage = false;

  reloadComponent() {
    this.p = 1;
    this.make = '';
    this.type = '';
    this.status = '';
    this.search = '';
    this.getAllDevices();
    this.isChecked = false;
    this.isCheckedAll = false;
    this.masterSelected = false;
    // this.toastermessage = true;
    setTimeout(() => {
      this.toastermessage = false
    }, 4000);
  }
  clearall() {
    this.p = 1;
    this.getAllDevices();
    this.isChecked = false;
    this.isCheckedAll = false;
    this.masterSelected = false;
    setTimeout(() => {
      this.toastermessage = false
    }, 3000);
  }


  closeToaster() {
    this.toastermessage = false
  }
  checkstaus: string
  updateStatus(id: number) {
    
    this.devServices.updateStautsDevice(id).subscribe((res: any) => {
      this.checkstaus = res.data;
      console.log("this.checkstats=====>", this.checkstaus);
      if (this.checkstaus == 'Inactive') {
        this.checkstaus = 'Active';
      }
      this.toaster.success(" Device is " + this.checkstaus, this.checkstaus)
      this.getAllDevices();

    });

  }

}
