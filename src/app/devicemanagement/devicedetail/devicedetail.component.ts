import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DeviceService } from 'src/app/services/deviceservice/device.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-devicedetail',
  templateUrl: './devicedetail.component.html',
  styleUrls: ['./devicedetail.component.css']
})
export class DevicedetailComponent implements OnInit {
  devicedetails: any;
  logs: any []=[];
  employeeId: any = "";
  startDateTime: any="" ;
  endDateTime: any="" ;
  pageNo: any = 1;
  itemsPerPage: any = 10;
  accesspoint: any;
  totalPages: any;
  logsCount:any;
  Ids: any[] = [];
  Logs:any[]=[];
  startingpoint: any;
  endingpoint: any;
  constructor(private activatedRoute: ActivatedRoute,
    private deviceService: DeviceService,
    private router: Router) { }
  id = this.activatedRoute.snapshot.params["id"];

  ngOnInit(): void {
    this.getDeviceDetails();
  }


  getDeviceDetails() {
    
    this.deviceService.detailPage(this.id,this.startDateTime,this.endDateTime, this.pageNo, this.itemsPerPage,
      this.employeeId).subscribe((res: any) => {
        console.log("This is response===>",res)
      this.devicedetails = res.data.result.device;
      this.logs = res.data.employeelogs;
      this.logsCount=res.data.filteredData.count;
      this.startingpoint=res.data.filteredData.starting_Point;
      this.endingpoint=res.data.filteredData.ending_Point;
      this.totalPages=res.data.filteredData.totalPages
      console.log(res);
      this.logs.forEach(c=> {
        console.log("Card No is =====>",c.logs.door_No)
      });

    })

  }
  NextPage(p:any){
    
    if(p<this.totalPages){
      let page=p+1;
      this.getDeviceDetails();
      this.pageNo=page;

    }
  }



  PreviousPage(p:any){
    if(p>1){
      let page=p-1;
      this.getDeviceDetails();
      this.pageNo=page;

    }

  }


  isChecked = false;
  isCheckedAll = false;
  masterSelected = false;

  checkUncheckAll(evt) {
    
    this.logs.forEach((c) => c.isChecked = evt.target.checked)

    this.masterSelected = this.logs.every((l) => l.isChecked == true);

    if (this.masterSelected == true) {
      this.logs.forEach((d) => {
        this.Logs.push(d);
      })
      console.log(this.Ids);
      this.isChecked = true;
      this.isCheckedAll = true;
    }
    else {
      this.logs.forEach((d) => {
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


    this.logs[index].isChecked = evt.target.checked
    this.masterSelected = this.logs.every((l) => l.isChecked == true);

    let checkselectedlogs=this.logs.find(x=>x.isChecked==true);
     if(this.masterSelected == true){
     this.isChecked = true;
     this.isCheckedAll = true;
     }
     else if(checkselectedlogs !=undefined){
      this.isChecked = true;
      this.isCheckedAll = false;

     }
     else{
       this.isChecked = false
     }

     let id = Number(evt.target.value);
     let log=this.logs.find(x=>x.id===id);
     if (index >= 0 && evt.target.checked == true) {
       this.Logs.push(log);
       console.log(this.Logs);
     }

     if (evt.target.checked == false) {
       for (var i = 0; i <= this.Logs.length; i++) {
         if (this.Logs[i].id == id) {
           this.Logs.splice(i, 1);
         }

       }
       console.log(this.Logs);
     }
  }


  fileName= 'Device_Logs.xlsx';

  exportToExcel(evt) :void{

    
     /* pass here the table id */
     let element = document.getElementById('machinelogs');
    // const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
     var ws2: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.Logs);

     /* generate workbook and add the worksheet */
     const wb: XLSX.WorkBook = XLSX.utils.book_new();
     XLSX.utils.book_append_sheet(wb, ws2, 'Sheet1');

     /* save to file */
     XLSX.writeFile(wb, this.fileName);

     this.logs.forEach((c) => c.isChecked = evt.target.checked)

    this.masterSelected = this.logs.every((l) => l.isChecked == true);

    if (this.masterSelected == false) {
      this.isChecked = false;
      this.isCheckedAll = false;
      this.Logs= [];
    }

  }

  reloadComponent() {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }

  DeviceTypeControl = new FormControl([]);
  DeviceTypes: string[] = ['Face','RFID','Bio'];

  onCatRemovedDeviceTypes(cat: string) {
    
    const DeviceTypes = this.DeviceTypeControl.value as string[];
    this.removeFirst(DeviceTypes, cat);
    this.DeviceTypeControl.setValue(DeviceTypes); // To trigger change detection
  }
  private removeFirst(array: any[], toRemove: any): void {

    const index = array.indexOf(toRemove);
    if (index !== -1) {
      array.splice(index, 1);
    }
  }
  toasterCancelMessage = false;
  toasterSaveMessage = false;
  toasterCancelMsg() {
    this.toasterSaveMessage = false;
    this.toasterCancelMessage = true;


    setTimeout(() => {
      this.toasterCancelMessage = false;
      this.router.navigateByUrl("/dashboard/devicemanagement/listofdevices")
    }, 2000);
  }
  toasterSaveMsg() {
    this.toasterCancelMessage = false;
    this.toasterSaveMessage = true;

    setTimeout(() => {
      this.toasterSaveMessage = false;

    }, 4000);
  }

  closeToaster(){
    this.toasterCancelMessage = false;
    this.toasterSaveMessage = false;
  }


}
