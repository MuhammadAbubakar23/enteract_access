import { ConstantPool } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MachineUser } from 'src/app/layouts/shared/models/MachineUserDto';
import { UserPermissionsDto } from 'src/app/layouts/shared/models/UserPermissionsDto';
import { AuthservicesService } from 'src/app/services/authservice/authservices.service';
import { CityService } from 'src/app/services/CityService/city.service';
import { ClientService } from 'src/app/services/clientservice/client.service';
import { DatashareService } from 'src/app/services/datashareservice/datashare.service';
import { DepartmentService } from 'src/app/services/departmentservice/department.service';
import { EntityService } from 'src/app/services/entityservice/entity.service';
import { GroupService } from 'src/app/services/groupservice/group.service';
import { LocationService } from 'src/app/services/locationservices/location.service';
import { MachineService } from 'src/app/services/machineuserservice/machine.service';
import { PermissionService } from 'src/app/services/permissionService/permission.service';
import { SubclientService } from 'src/app/services/subclientservice/subclient.service';

@Component({
  selector: 'app-createmachineuser',
  templateUrl: './createmachineuser.component.html',
  styleUrls: ['./createmachineuser.component.css']
})
export class CreatemachineuserComponent implements OnInit {

  // message: string[] = ["Users", "Create User", "Users", "Teams", "/dashboard/listofusers", "/dashboard/listofteams", "fal fa-users", "fal fa-users-class", "fal fa-users-class", "listofusers", "listofusers/createuser", "breadcrumb-item active"];
  message: any = {
    title: "Users",
    Icon: "fal fa-users",
    subTitle: "Create User",
    Url: "/dashboard/listofusers"
  }
  mode = "create";
  constructor(private spinner: NgxSpinnerService,) {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 4000);
  }

  ngOnInit(): void {

  }






}
