import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { DatashareService } from 'src/app/services/datashareservice/datashare.service';
import { GroupService } from 'src/app/services/groupservice/group.service';

@Component({
  selector: 'app-listofgroups',
  templateUrl: './listofgroups.component.html',
  styleUrls: ['./listofgroups.component.css']
})
export class ListofgroupsComponent implements OnInit {

  // message: string[] = ["Groups", "", "Users", "Teams", "/dashboard/listofusers", "/dashboard/listofteams", "/dashboard/listofgroups", "fal fa-users", "fal fa-users-class", "fal fa-users", "/dashboard/listofgroups"];
  message: any = {
    title: "Groups",
    Icon: "fa-light fa-people-group pe-2",
    subTitle: "",
    Url: "/dashboard/listofgroups"
  }
  Groups: any;

  constructor(public groupService: GroupService,
    public toaster: ToastrService,
    private dataShare: DatashareService,
    private spinner: NgxSpinnerService,) { 
      this.spinner.show();
      setTimeout(() => {
        this.spinner.hide();
      }, 4000);
    }

  ngOnInit(): void {
    this.getAllGroups()
    this.dataShare.sendMessage(this.message);
  }

  getAllGroups() {
    
    this.groupService.getAll().subscribe((res: any) => {
      this.Groups = res.data;
    }
    )
  }

  deleteGroup(group: any) {
    
    this.groupService.remove(group).subscribe((res: any) => {
      this.getAllGroups(),
        this.toaster.success("Data has been deleted Successfully", "Removed")
    },
      err => {
        this.toaster.error("Something went wrong", "Error")
      })
  }



}
