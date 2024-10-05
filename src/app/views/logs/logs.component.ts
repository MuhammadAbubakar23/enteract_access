import { Component, OnInit, TemplateRef } from '@angular/core';
import { filters } from 'src/app/layouts/shared/models/filtersDto';
import { Router } from '@angular/router';
import { DatashareService } from 'src/app/services/datashareservice/datashare.service';
import { LogsService } from 'src/app/services/logsService/logs.service';
import * as XLSX from 'xlsx';
import { NgxSpinnerService } from 'ngx-spinner';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {



  Logs: any = [];
  search: string = "";
  city: string = "";
  p: any = 1;
  itemsPerPage: any = 20;
  logsCount: any;
  Starting_Point: any;
  Ending_Point: any;
  totalPages: any;
  endDateTime: Date;
  startDateTime: Date;

  sort: string = "";
  modalRef: BsModalRef

  // message:string[]=["Logs","","","","","","","","fal fa-clipboard-check","/dashboard/logs"];

  message: any = {
    title: "Logs",
    Icon: "fal fa-clipboard-check",
    subTitle: "",
    Url: "/dashboard/logs"
  }


  status: any[] = [];

  Ids: any[] = [];
  logs: any[] = [];



  constructor(private logsService: LogsService,
    private dataShare: DatashareService,
    private router: Router,
    private SpinnerService: NgxSpinnerService,
    private modalService: BsModalService) {
      this.SpinnerService.show();
    setTimeout(() => {
      this.SpinnerService.hide();
    }, 4000);
  }

  ngOnInit(): void {
    this.getAllLogs();
    this.dataShare.sendMessage(this.message);
  }

  getsortValue(evt) {
    
    this.sort = evt.target.innerHTML;
    this.getAllLogs();

  }

  getAllLogs() {
    
    // let form:FormData=new FormData();
    var data = {
      Search: this.search,
      Page_No: this.p,
      ItemsPerPage: this.itemsPerPage,
      startDateTime: this.startDateTime,
      endDateTime: this.endDateTime,
      Sort: this.sort
    }
    // form.append('search',this.search);
    // form.append('pageno',this.p);
    // form.append('itemsperpage',this.itemsPerPage);
    // form.append('startdatetime',String(this.startDateTime));
    // form.append('enddatetime',String(this.endDateTime));

    // console.log(form);
    this.SpinnerService.show();
    this.logsService.getAll(data).subscribe(
      (res: any) => {
        console.log("User Logs==>", res);
        
        this.Logs = res.data;
        console.log("Door No", res.data);
        this.SpinnerService.hide();
        this.logsCount = res.pagination.count;
        this.Starting_Point = res.pagination.starting_Point;
        this.Ending_Point = res.pagination.ending_Point;
        this.totalPages = res.pagination.totalPages;
      },
      err => {
        console.log(err);
      }
    )
  }

  yesorNo: boolean = false;

  openModalNext(popupNext: TemplateRef<any>) {

    if (this.Logs.find(x => x.isChecked == true) && (this.p < this.totalPages)) {
      this.modalRef = this.modalService.show(popupNext);
    }
    else {
      this.NextPage(this.p)
    }

  }
  openModalPrevious(popupPrevious: TemplateRef<any>) {

    if (this.Logs.find(x => x.isChecked == true) && (this.p > 1)) {
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

  NextPage(p: any) {
    

    let page = p + 1;
    
    if (page < this.totalPages) {
      this.p = page;
      console.log("This is count of Total Pages::", this.totalPages);
      if (this.Logs.find(x => x.isChecked == true)) {
        this.isChecked = false;
        this.isCheckedAll = false;
        this.masterSelected = false;
      }
      this.getAllLogs();
    }
    this.p;





  }
  PreviousPage(p: any) {
    
    if (p >= 1) {
      let page = p - 1;
      if (page > 0) {
        this.p = page;
        if (this.Logs.find(x => x.isChecked == true)) {
          this.isChecked = false;
          this.isCheckedAll = false;
          this.masterSelected = false;
        }

        this.getAllLogs();
      }
    }

  }

  getLogByEmployeeName(search: string) {
    
    this.getAllLogs()
  }
  isChecked = false;
  isCheckedAll = false;
  masterSelected = false;

  // checkUncheckAll(evt) {
  //   
  //   this.Logs.forEach((c) => c.isChecked = evt.target.checked)

  //   this.masterSelected = this.Logs.every((l) => l.isChecked == true);

  //   if(this.masterSelected == true){
  //     this.isChecked = true;
  //     this.isCheckedAll = true;
  //     }
  //     else {
  //      this.isChecked = false;
  //      this.isCheckedAll = false;

  //     }

  // }

  // isAllSelected(evt, index) {

  //   this.Logs[index].isChecked = evt.target.checked
  //   this.masterSelected = this.Logs.every((l) => l.isChecked == true);

  //   let checkselectedlogs=this.Logs.find(x=>x.isChecked==true);
  //    if(this.masterSelected == true){
  //    this.isChecked = true;
  //    this.isCheckedAll = true;
  //    }
  //    else if(checkselectedlogs !=undefined){
  //     this.isChecked = true;
  //     this.isCheckedAll = false;

  //    }
  //    else{
  //      this.isChecked = false
  //    }
  // }

  checkUncheckAll(evt) {
    
    this.Logs.forEach((c) => c.isChecked = evt.target.checked)

    this.masterSelected = this.Logs.every((l) => l.isChecked == true);

    if (this.masterSelected == true) {
      this.Logs.forEach((d) => {
        this.logs.push(d);
      })
      console.log(this.Ids);
      this.isChecked = true;
      this.isCheckedAll = true;
    }
    else {
      this.Logs.forEach((d) => {
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


    this.Logs[index].isChecked = evt.target.checked
    this.masterSelected = this.Logs.every((l) => l.isChecked == true);

    let checkselectedlogs = this.Logs.find(x => x.isChecked == true);
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

    let id = Number(evt.target.value);
    let log = this.Logs.find(x => x.id === id);
    if (index >= 0 && evt.target.checked == true) {
      this.logs.push(log);
      console.log(this.logs);
    }

    if (evt.target.checked == false) {
      for (var i = 0; i <= this.logs.length; i++) {
        if (this.logs[i].id == id) {
          this.logs.splice(i, 1);
        }

      }
      console.log(this.logs);
    }
  }
  fileName = 'Logs.xlsx';

  exportToExcel(evt): void {


    
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
      this.Logs = [];
    }

  }

  reloadComponent() {
    // let currentUrl = this.router.url;
    //     this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    //     this.router.onSameUrlNavigation = 'reload';
    //     this.router.navigate([currentUrl]);

    this.p = 1;
    this.getAllLogs();

    this.masterSelected = false;
    this.isChecked = false;
    this.isCheckedAll = false;
  }


}
