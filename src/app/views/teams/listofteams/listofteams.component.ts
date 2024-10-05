import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ClientService } from 'src/app/services/clientservice/client.service';
import { DatashareService } from 'src/app/services/datashareservice/datashare.service';

@Component({
  selector: 'app-listofteams',
  templateUrl: './listofteams.component.html',
  styleUrls: ['./listofteams.component.css']
})
export class ListofteamsComponent implements OnInit {

  Teams: any;
  name: any;
  p: any = 1;
  itemsPerPage: any = 10;
  totalClients: any;
  totalpages: any;
  startinpoint: any;
  endingPoint: any;
  srch: string = "";
  city: any = "";
  Ids: any[] = [];

  // message: string[] = ["Teams", "", "Users", "Teams", "/dashboard/listofusers", "/dashboard/listofteams", "fal fa-users", "fal fa-users-class", "fal fa-users", "/dashboard/listofteams"];
  message: any = {
    title: "Teams",
    Icon: "fal fa-users-class pe-2",
    subTitle: "",
    Url: "/dashboard/listofteams"
  }
  sort: string = "";
  modalRef: BsModalRef



  constructor(private clientService: ClientService,
    private toaster: ToastrService,
    private dataShare: DatashareService,
    private router: Router,
    private SpinnerService: NgxSpinnerService,
    private modalService: BsModalService
  ) {
    this.SpinnerService.show();
    setTimeout(() => {
      this.SpinnerService.hide();
    }, 4000);
  }

  ngOnInit(): void {
    this.getAllClients();
    this.dataShare.sendMessage(this.message);
  }


  getAllClients() {
    
    let data = {
      Page_No: this.p,
      ItemsPerPage: this.itemsPerPage,
      Search: this.srch,
      Sort: this.sort
    }
    this.SpinnerService.show();
    this.clientService.getAll(data).subscribe((res: any) => {
      this.Teams = res.data;
      console.log("Teams respons====>", res)
      
      this.totalClients = res.pagination.count;
      this.totalpages = res.pagination.totalPages;
      this.startinpoint = res.pagination.starting_Point
      this.endingPoint = res.pagination.ending_Point
      console.log(res);
      this.SpinnerService.hide();

    })
  }

  ClientByName() {
    this.getAllClients()

  }

  yesorNo: boolean = false;

  openModalNext(popupNext: TemplateRef<any>) {

    if (this.Teams.find(x => x.isChecked == true) && (this.p < this.totalpages)) {
      this.modalRef = this.modalService.show(popupNext);
    }
    else {
      this.NextPage(this.p)
    }

  }
  openModalPrevious(popupPrevious: TemplateRef<any>) {

    if (this.Teams.find(x => x.isChecked == true) && (this.p > 1)) {
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
    
    if (page < this.totalpages) {
      this.p = page;
      console.log("This is count of Total Pages::", this.totalpages);
      if (this.Teams.find(x => x.isChecked == true)) {
        this.isChecked = false;
        this.isCheckedAll = false;
        this.masterSelected = false;
      }
      this.getAllClients();
    }
    this.p;





  }
  PreviousPage(p: any) {
    
    if (p >= 1) {
      let page = p - 1;
      if (page > 0) {
        this.p = page;
        if (this.Teams.find(x => x.isChecked == true)) {
          this.isChecked = false;
          this.isCheckedAll = false;
          this.masterSelected = false;
        }

        this.getAllClients();
      }
    }

  }



  getsortValue(evt) {
    
    this.sort = evt.target.innerHTML;
    this.getAllClients();

  }

  deleteClient(team: any) {
    
    this.clientService.Remove(team).subscribe(res => {
      this.getAllClients();
      this.toaster.warning("Team has been removed", "Removed")
    })
  }


  deleteMultiple() {
    
    this.clientService.deletemultiple(this.Ids).subscribe(res => {
      this.toaster.success("Selected record deleted", "Success");
      this.getAllClients();
    },
      err => {
        console.log(err);
      })

  }

  isChecked = false;
  isCheckedAll = false;
  masterSelected = false;

  checkUncheckAll(evt) {
    this.Teams.forEach((c) => c.isChecked = evt.target.checked);

    this.masterSelected = this.Teams.every((l) => l.isChecked == true);

    if (this.masterSelected == true) {

      this.Teams.forEach((d) => {
        this.Ids.push(d.id);
      })
      console.log(this.Ids);
      this.isChecked = true;
      this.isCheckedAll = true;
    }
    else {
      this.Teams.forEach((d) => {
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
    
    let id = Number(evt.target.value);
    if (index >= 0 && evt.target.checked == true) {
      this.Ids.push(id);
      console.log(this.Ids);
    }

    if (evt.target.checked == false) {
      for (var i = 0; i <= this.Ids.length; i++) {
        if (this.Ids[i] == id) {
          this.Ids.splice(i, 1);
        }

      }
      console.log(this.Ids)
    }

    this.Teams[index].isChecked = evt.target.checked
    this.masterSelected = this.Teams.every((l) => l.isChecked == true);

    let checkselectedlogs = this.Teams.find(x => x.isChecked == true);
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

  reloadComponent() {
    this.p = 1;
    this.getAllClients();
    this.masterSelected = false;
    this.isChecked = false;
    this.isCheckedAll = false;

  }

}
