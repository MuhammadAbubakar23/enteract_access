import { AfterViewInit, Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { findIndex } from 'rxjs';
import { DashboardComponent } from 'src/app/layouts/default/dashboard/dashboard.component';
import { ClientService } from 'src/app/services/clientservice/client.service';
import { DatashareService } from 'src/app/services/datashareservice/datashare.service';
import { DepartmentService } from 'src/app/services/departmentservice/department.service';
import { MachineService } from 'src/app/services/machineuserservice/machine.service';
import { SidenavServiceService } from 'src/app/services/sidenavService/sidenav-service.service';

@Component({
  selector: 'app-listofmachineusers',
  templateUrl: './listofmachineusers.component.html',
  styleUrls: ['./listofmachineusers.component.css']
})
export class ListofmachineusersComponent implements OnInit, AfterViewInit {

  currentPage: any;
  MachineUsers: any[] = []
  search: string = "";
  city: string = "";
  p: any = 1;
  itemsPerPage: any = 10;
  totalUsersCount: any;
  totalPages: any;
  Starting_Point: any;
  Ending_Point: any;
  departments: any;
  dep_id: any = "";
  Teams: any;
  teamId: any = "";
  sort: string = "";

  isChecked = false;
  isCheckedAll = false;
  masterSelected = false;
  yesorNo: boolean = false;
  toastermessage = false;

  modalRef: BsModalRef;
  // message: string[] = ["Users", "", "Users", "Teams", "/dashboard/listofusers", "/dashboard/listofteams", 
  // "fal fa-users", "fal fa-users-class", "fal fa-users-class", "listofusers"];
  message: any = {
    title: "Users",
    Icon: "fal fa-users-class",
    subTitle: "",
    Url: "/dashboard/listofusers"
  }
  TeamsLength: any;

  constructor(private userService: MachineService,
    private toastr: ToastrService,
    private depService: DepartmentService,
    private clientService: ClientService,
    private dataShare: DatashareService,
    private router: Router,
    private SpinnerService: NgxSpinnerService,
    private load: DashboardComponent,
    private modalService: BsModalService,
    private sidenavService: SidenavServiceService) {
    this.SpinnerService.show();
    setTimeout(() => {
      this.SpinnerService.hide();
    }, 4000);
  }
  ngAfterViewInit(): void {
    this.dataShare.sendMessage(this.message);
  }
  // public routerLinkVariable = '/dashboard/listofusers'

  ngOnInit(): void {
    this.getAllUsers();
    this.getAllDepartments();
    this.TeamsinDepartment();

    var hhhh = 0;
    for (var hhhh = 0; hhhh < 5; hhhh++) {
      console.log("value  inside for loop", hhhh)
    }
    console.log("value outside for loop", hhhh);

    // this.sidenavService.updateMessage(this.routerLinkVariable);

  }

  depatmentname: any;
  getAllDepartments() {
    this.depService.getAll().subscribe((res: any) => {
      this.departments = res;
      this.depatmentname = this.departments;
      console.log("Departments====>@@", this.departments);
    })
  }

  selectedTeam: any
  TeamsinDepartment() {
    this.clientService.getAllTeamsInDepartment().subscribe((res: any) => {
      this.Teams = res;
      this.selectedTeam = this.Teams;
      console.log("Teams===>of Department", this.selectedTeam);
    });

  }

  getByTeam(event) {
    this.teamId = event.target.value
    this.getAllUsers()
  }

  getByDepartment(event) {
    this.dep_id = event.target.value
    this.getAllUsers()
  }

  // getAllTeams() {
  //   this.clientService.getAllData().subscribe((res: any) => {
  //     this.Teams = res.data;
  //   })
  // }

  Team: []
  getAllUsers() {
    var data = {
      pageNo: this.p,
      recordPerPage: this.itemsPerPage,
      searchText: this.search,
      department: this.dep_id,
      team: this.teamId,
      // employeeId: "",
      // name: this.search,
      // email: "",
      // campaign: "",
      // location: "",
      // designation: "",
      // legalEntity: ""
    }
    
    this.SpinnerService.show();
    this.userService.GetAllUserList(data).subscribe((res: any) => {
      console.log(" user data res====>", res)
debugger
      this.MachineUsers = res?.data.paginatedRecords;
      console.log("the user recode ===>", this.MachineUsers)

      this.SpinnerService.hide();
      this.totalUsersCount = res?.data?.totalCount;
      this.totalPages = res?.data?.totalPages;
      this.currentPage = res?.data?.pageNumber;

      res?.data?.paginatedRecords?.push

      console.log("Users========>", this.MachineUsers);
      if (this.currentPage == 1) {
        this.Starting_Point = this.currentPage
      }
      else {
        this.Starting_Point = (this.currentPage - 1) * (res?.data?.pageSize) + 1
      }
      this.Ending_Point = this.Starting_Point + res?.data?.pageSize - 1


    },
      err => {
        console.log(err)
      })
    return this.MachineUsers;

  }

  deleteMultiple() {
    // ;
    // this.userService.deletemultiple(this.Ids).subscribe(res => {
    //   console.log(res);
    //   this.getAllUsers();
    //   this.reloadComponent();
    // },
    //   err => {
    //     console.log(err);
    //   })

  }

  openModalNext(popupNext: TemplateRef<any>) {

    if (this.MachineUsers.find(x => x.isChecked == true) && (this.p < this.totalPages)) {
      this.modalRef = this.modalService.show(popupNext);
    }
    else {
      this.NextPage(this.p)
    }

  }

  openModalPrevious(popupPrevious: TemplateRef<any>) {

    if (this.MachineUsers.find(x => x.isChecked == true) && (this.p > 1)) {
      this.modalRef = this.modalService.show(popupPrevious);
    }
    else {
      this.PreviousPage(this.p)
    }

  }

  maketrueNext() {
    ;
    this.yesorNo = !this.yesorNo;
    this.NextPage(this.p);
    this.modalRef.hide();

  }

  maketruePrevious() {
    ;
    this.yesorNo = !this.yesorNo;
    this.PreviousPage(this.p);
    this.modalRef.hide();

  }

  NextPage(currentPage: any) {
    let page = currentPage + 1;
    ;
    if (page < this.totalPages + 1) {
      this.p = page;
      if (this.MachineUsers.find(x => x.isChecked == true)) {
        this.isChecked = false;
        this.isCheckedAll = false;
        this.masterSelected = false;
      }
      this.getAllUsers();
    }
    this.p;

  }
  PreviousPage(p: any) {
    ;
    if (p >= 1) {
      let page = p - 1;
      if (page > 0) {
        this.p = page;
        if (this.MachineUsers.find(x => x.isChecked == true)) {
          this.isChecked = false;
          this.isCheckedAll = false;
          this.masterSelected = false;
        }
        this.getAllUsers();
      }
    }


  }


  getsortValue(evt) {
    
    this.sort = evt.target.innerHTML;
    this.getAllUsers();

  }

  getUserByName(event) {
    if (this.search.length > 3) {
    this.getAllUsers();
    }
    if (this.search.length == 0) {
      this.getAllUsers();
    }
  }

  deleteUser(Ids: number[]) {

    this.userService.remove(Ids).subscribe((res: any) => {
      console.log("res of remove user===>", res);

      this.toastr.success("User deleted successfully", "Success");
      this.refreshe();



    },
      err => {
        this.toastr.error("Something went wrong", "Error")
      }
    )
    // this.userService.remove(Ids).subscribe((res: any) => {
    //   console.log("Remove access of user response===>", res)
    //   this.toastr.success("Data deleted successfully", "Success");
    //   this.getAllUsers()
    // },
    //   err => {
    //     this.toastr.error("Something went wrong", "Error");

    //   })
  }



  checkUncheckAll(evt) {
    ;
    this.MachineUsers.forEach((c) => c.isChecked = evt.target.checked)

    this.masterSelected = this.MachineUsers.every((l) => l.isChecked == true);

    if (this.masterSelected == true) {
      this.MachineUsers.forEach((d) => {
        this.Ids.push(d.id);
      })
      console.log(this.Ids);
      this.isChecked = true;
      this.isCheckedAll = true;
    }
    else {
      this.MachineUsers.forEach((d) => {
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
  Ids: number[] = [];


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

    this.MachineUsers[index].isChecked = evt.target.checked
    this.masterSelected = this.MachineUsers.every((l) => l.isChecked == true);

    let checkselectedlogs = this.MachineUsers.find(x => x.isChecked == true);
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
    this.teamId = '';
    this.dep_id = '';
    this.search = '';
    this.getAllUsers();
    this.isChecked = false;
    this.isCheckedAll = false;
    this.masterSelected = false;
    this.toastermessage = false
  }

  closeToaster() {
    this.toastermessage = false
  }

  refreshe() {
    
    this.getAllUsers();
    this.isChecked = false;
    this.masterSelected = false;
    this.toastermessage = false;
    this.isCheckedAll = false
  }
}
