import { Component, OnInit,Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Teams } from 'src/app/layouts/shared/models/TeamsDto';
import { ClientService } from 'src/app/services/clientservice/client.service';
import { DatashareService } from 'src/app/services/datashareservice/datashare.service';
import { DepartmentService } from 'src/app/services/departmentservice/department.service';
import { PermissionService } from 'src/app/services/permissionService/permission.service';

@Component({
  selector: 'app-teamsform',
  templateUrl: './teamsform.component.html',
  styleUrls: ['./teamsform.component.css']
})
export class TeamsformComponent implements OnInit {

  departments: any;
  permissions: any;
  team = new Teams();
  Teams: any;
  search: string = "";
  teamForm = new FormGroup({
    Name: new FormControl(this.team.name, [Validators.required, Validators.minLength(2), Validators.maxLength(25)]),
    Department: new FormControl(this.team.department, [Validators.required]),
    Group: new FormControl(this.team.group, [Validators.required]),
    BusinessHours: new FormControl(this.team.businesshours, [Validators.required]),
    Role: new FormControl(this.team.businesshours, [Validators.required]),
    Permission: new FormControl(this.team.permission, [Validators.required]),
    Description: new FormControl(this.team.description, [Validators.required])
  });
  id = this.activatedRoute.snapshot.params["id"];
  numId = Number(this.id);
  @Input() message=[];
  @Input() mode="";
  constructor(private clientService: ClientService,
    private depService: DepartmentService,
    private toaster: ToastrService,
    private router: Router,
    private dataShare: DatashareService,
    private permissionService: PermissionService,
    private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    if(this.mode=="update"){
      this.getClientById();
    }
    this.getAllDepartments();
    this.dataShare.sendMessage(this.message);
    this.getAllPermissions();
    this.getAllTeams();

  }

  getAllDepartments() {
    this.depService.getAll().subscribe((res: any) => {
      console.log(res.data);
      this.departments = res.data;
    })

  }
  getAllTeams() {
    this.clientService.getAllData().subscribe((res: any) => {
      this.Teams = res.data;
      console.log("this.Clients", this.Teams)
    })

  }
  getAllPermissions() {
    this.permissionService.getAll(this.search).subscribe((res: any) => {
      this.permissions = res.data;
      console.log("perms==>", res.data);
    });
  }

  getClientById() {
    
    this.clientService.getbyId(this.numId).subscribe((res: any) => {
      console.log(res);
      this.teamForm.patchValue({
        Id: res.data.id,
        Name: res.data.name,
        Department_Id:res.data.department_Id,
        Description: res.data.description

      })
    })
  }
  submitform(){
    if(this.mode=="create"){
this.saveTeam()
    }
    if(this.mode=="update"){
      this. UpdateTeam();
    }
  }
  saveTeam() {
    console.log("Saving team...", this.teamForm)
    
    this.clientService.Add(this.teamForm.value).subscribe((res: any) => {
      this.router.navigateByUrl("/dashboard/listofteams");
      this.toaster.success("Team is added Successfully", "Success");

    })
  }
  UpdateTeam() {
    console.log("updateing client",this.teamForm.value)
    this.clientService.Update(this.teamForm.value).subscribe(res => {
      this.router.navigateByUrl("/dashboard/listofteams");
      this.toaster.success("Team is updated","Success");
    },
    err=>{
      this.toaster.error("Something went wrong","Error");
    })

  }



}
