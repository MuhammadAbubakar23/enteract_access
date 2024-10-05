import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Group } from 'src/app/layouts/shared/models/GroupDto';
import { CityService } from 'src/app/services/CityService/city.service';
import { ClientService } from 'src/app/services/clientservice/client.service';
import { DatashareService } from 'src/app/services/datashareservice/datashare.service';
import { DepartmentService } from 'src/app/services/departmentservice/department.service';
import { GroupService } from 'src/app/services/groupservice/group.service';
import { LocationService } from 'src/app/services/locationservices/location.service';
import { PermissionService } from 'src/app/services/permissionService/permission.service';

@Component({
  selector: 'app-editgroup',
  templateUrl: './editgroup.component.html',
  styleUrls: ['./editgroup.component.css']
})
export class EditgroupComponent implements OnInit {
  mode = "update"
  // message: string[] = ["Groups", "Update Group", "Users", "Teams","Groups", "/dashboard/listofusers", "/dashboard/listofteams","/dashboard/listofgroups", "fal fa-users",  "/dashboard/listofgroups", "/dashboard/listofgroups/updategroup", "breadcrumb-item active"];
  message: any = {
    title: "Groups",
    Icon: "fa-light fa-people-group pe-2",
    subTitle: "Update Group",
    Url: "/dashboard/listofgroups"
  }


  constructor(private spinner: NgxSpinnerService,) {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 4000);
  }

  ngOnInit(): void {

  }

}
