import { Component, OnInit, Input} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
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
  selector: 'app-groupform',
  templateUrl: './groupform.component.html',
  styleUrls: ['./groupform.component.css']
})
export class GroupformComponent implements OnInit {

  departments:any
  teams:any
  cities:any
  locations:any
  permissions:any
  search:any
  @Input() message=[]
  @Input() mode=""
  group:Group=new Group()

    groupForm=new FormGroup({
      id:new FormControl(this.group.id),
      Name:new FormControl(this.group.name),
      Alias:new FormControl(this.group.alias),
      Department:new FormControl(this.group.department),
      Team:new FormControl(this.group.team),
      City:new FormControl(this.group.city),
      Location:new FormControl(this.group.location),
      Permission:new FormControl(this.group.permission)

    })

    constructor(private groupService:GroupService,
                private router:Router,
                private toaster:ToastrService,
                private departService:DepartmentService,
                private cityService:CityService,
                private locationService:LocationService,
                private permissionService:PermissionService,
                private teamService:ClientService,
                private dataShare:DatashareService

                ) { }

    ngOnInit(): void {
      this.AllDepertments();
      this.AllTeams();
      this.AllCities();
      this.AllLocations();
      this.AllPermissions();
      this.dataShare.sendMessage(this.message);
    }
    AllDepertments(){
  this.departService.getAll().subscribe((res:any)=>{
    this.departments=res.data
  })
  }
  AllTeams(){
    this. teamService.getAllData().subscribe((res:any)=>{
      this.teams=res.data
    })
  }
  AllCities(){
    this.cityService.getAll().subscribe((res:any)=>{
      this.cities=res.data
    })
  }
  AllLocations(){
    this.locationService.getAllLocations().subscribe((res:any)=>{
      this.locations=res.data
    })
  }
  AllPermissions(){
    this.permissionService.getAll(this.search).subscribe((res:any)=>{
      console.log("perms",res)
      this.permissions=res.data
    })
  }
  submitform(){
    if (this.mode==="create"){
      this.addGroup();
    }
    if (this.mode==="update"){
      this.editGroup();
    }

  }
    addGroup(){
      console.log("Add Group",this.groupForm.value)
      this.groupService.Add(this.groupForm.value).subscribe((res:any)=>{
        console.log(res);
        this.router.navigateByUrl("/dashboard/groupmanagement/listofGroups");
        this.toaster.success("Added Successfully","Success")
      })

    }


    editGroup(){
      console.log("editGroup",this.groupForm.value)
      this.groupService.update(this.groupForm.value).subscribe((res:any)=>{
        this.router.navigateByUrl("/dashboard/groupmanagement/listofGroups"),
        this.toaster.success("Data has been updated","Success")
        console.log(res)
      })
    }

  }
