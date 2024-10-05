import { ConstantPool } from '@angular/compiler';
import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  selector: 'app-machineform',
  templateUrl: './machineform.component.html',
  styleUrls: ['./machineform.component.css']
})
export class MachineformComponent implements OnInit {
  id = this.activatedRoute.snapshot.params["id"]
  numId = Number(this.id);
  Teams: any;
  Departments: any;
  SubClients: any;
  Entities: any;
  search: string = "";
  RolesList: any;
  Permissionsarr: any[] = [];
  perArray: any[] = [];
  desingnation:any[]=[];
  file: any;
  selectedFile: File | null = null;
  @Input() message = [];
  @Input() mode = ""
  Permissions: any;
  groups: any;
  cities: any;
  locations: any;
  imageUrl: string;
  imageStatus: boolean = false;
  public bankCtrl: FormControl = new FormControl();
  public bankFilterCtrl: FormControl = new FormControl();
  machine: MachineUser = new MachineUser();
  show:boolean= false;
  base64image:string;
  fileInput: any;
  UserForm = new FormGroup({

    //Personal information Form starts
    FullName: new FormControl(this.machine.fullname, [Validators.required, Validators.minLength(2), Validators.maxLength(30)]),
    CNIC: new FormControl(this.machine.cnic),
    Profile: new FormControl(this.machine.profile, [Validators.required]),
    EntityName: new FormControl(this.machine.entityName, [Validators.required]),
    Department: new FormControl(this.machine.department, [Validators.required]),
    Team: new FormControl(this.machine.team, [Validators.required]),
    Group: new FormControl(this.machine.group),
    Designation: new FormControl(this.machine.designation, [Validators.required]),
    EmployeeId: new FormControl(this.machine.employeeid, [Validators.required]),
    Status: new FormControl(this.machine.status),
    ContactNumber: new FormControl(this.machine.contactnumber, [Validators.required]),
    EmailAddress: new FormControl(this.machine.emailAddress, [Validators.email, Validators.required]),
    City: new FormControl(this.machine.city, [Validators.required]),
    Location: new FormControl(this.machine.location, [Validators.required]),
    Permission: new FormControl(this.machine.permission,),
    VisitPurpose: new FormControl(this.machine.visitpurpose),
    VCompanyName: new FormControl(this.machine.Vcompanyname),
    VContactNumber: new FormControl(this.machine.Vcontactnumber),
    VCompanyDepartment: new FormControl(this.machine.Vcompanydepartment),
    IbexPointofContact: new FormControl(this.machine.ibexpointofcontact),
    IbexDepartName: new FormControl(this.machine.ibexdepartname),
    IbexVisitingFloor: new FormControl(this.machine.ibexvisitingfloor),
    Note: new FormControl(this.machine.note),
    RFID:new FormControl(this.machine.rfid ,[Validators.required]),
    Password:new FormControl(this.machine.password,[Validators.required])
  });



  constructor(public clientService: ClientService,
    public machineUserService: MachineService,
    private entityService: EntityService,
    public depService: DepartmentService,
    public subClientService: SubclientService,
    private router: Router,
    private toastr: ToastrService,
    private dataShare: DatashareService,
    private permissionService: PermissionService,
    private authService: AuthservicesService,
    private groupservice: GroupService,
    private cityService: CityService,
    private locationService: LocationService,
    private activatedRoute: ActivatedRoute

  ) { }
  urlToFile(imageUrl: string): File {
    
    const xhr = new XMLHttpRequest();
    xhr.open('GET', imageUrl, true);
    xhr.responseType = 'blob';
    xhr.onload = () => {
      
      const blob = xhr.response;
      const file = new File([blob], this.imageUrl);
      this.fileInput.files = [file];
    };
    xhr.onerror = () => {
      console.error('Failed to fetch the image.');
    };
    xhr.send();
    return null;
  }
  ngOnInit(): void {
    if(this.mode=="update"){
      this.getUserbyId();
      
    }
   
    this.getAllClients();
    this.getAllDepartments();
    this.getAllCities();
    this.getAllLocations();
    this.getAlldesingnation();
    //this.getAllSubClients();
    //this.getAllEntities();
    this.dataShare.sendMessage(this.message);
    this.getAllPermissions();
    //this.getAllRoles();
    this.getAllGroups();
    this. getUserbyId();

  }



  populatepermissionId(name: any) {
    
    name.forEach(e => {
      let rrrr = this.perArray.find(r => r == e);
      if (rrrr) {
        return false;
      }
      this.perArray.push(e);
      return true;
    });





    console.log(this.perArray);
  }


  getAllPermissions() {
    this.permissionService.getAll(this.search).subscribe((res: any) => {
      this.Permissions = res.data;
      console.log("Permission=====>", res.data);
    })
  }
  getAllSubClients() {
    this.subClientService.getAll().subscribe((res: any) => {
      this.SubClients = res.data
    })
  }

  getAllDepartments() {
    this.depService.getAll().subscribe((res: any) => {
      console.log(res.data)
      this.Departments = res.data
      console.log("this.Departments", this.Departments)
    })
  }
  getAllClients() {
    
    this.clientService.getAllData().subscribe((res: any) => {
      this.Teams = res.data;
      console.log("this.Clients", this.Teams)
    })
  }
  getAllGroups() {
    this.groupservice.getAll().subscribe((res: any) => {
      this.groups = res.data;
    })
  }
  getAlldesingnation(){
   this.machineUserService.getDesingation().subscribe((res:any)=>{
    this.desingnation=res;
    console.log("the desingnation of user====>",this.desingnation)
   })
  }
  getAllEntities() {
    this.entityService.getAll().subscribe(
      (res: any) => {
        this.Entities = res.data;
        console.log(this.Entities)
      },
      err => {
        console.log(err);
      }
    )
  }
  getAllCities() {
    this.cityService.getAll().subscribe((res: any) => {
      this.cities = res.data;
      console.log("cities", this.cities);
    })
  }
  getAllLocations() {
    this.locationService.getAllLocations().subscribe((res: any) => {
      this.locations = res.data;
      console.log("locations", this.locations);
    })
  }
  getAllRoles() {
    this.authService.getRoles().subscribe((res: any) => {
      this.RolesList = res.data;
      console.log(res.data);
    })

  }
  base64Image:string
  selectedName:string;
  updateImage(event) {
 
    this.file = event.target.files[0];

    const reader = new FileReader();
    reader.onload = (e) => {
      // this.imageUrl = e.target.result as string;
      this.imageUrl=e.target.result as string
      this.imageStatus = true;
      this.selectedName=this.file.name
      console.log("Hello===>image", this.imageUrl);
      console.log("the name of image===>",this.selectedName)
    };
    reader.readAsDataURL(this.file);

  
  
  }

  filterMyOptions(event: any) {
    
    console.log(event);

  }

  submitform() {
    
    console.log("mode===>", this.mode)

    if (this.mode == "create") {
      this.saveUser()
    }
    if (this.mode == "update") {
      this.updateUser()
    }
  }
 data:any[];
  saveUser() {
    
     let data ={
      "strName":this.UserForm.value.FullName,
      "username":this.UserForm.value.EntityName,
      "employee_Id":this.UserForm.value.EmployeeId,
      "email":this.UserForm.value.EmailAddress,
      "password":this.UserForm.value.Password,
      "mobile":this.UserForm.value.ContactNumber,
      "department_Id":this.UserForm.value.Department,
      "client_Id":this.UserForm.value.Team,
      "designation_Id":this.UserForm.value.Designation,
      "rfId":this.UserForm.value.RFID,
      "location_Id":this.UserForm.value.Location,
      "imageUrl": this.imageUrl,
     }

    console.log("The data for the uploading is====>",data);
    
    this.machineUserService.postUser(data).subscribe((res:any) => {
      console.log("the res for the added user====>",res)
      if (res.statusCode==200){
        this.toastr.success("User Added successfully","Success");
         this.router.navigateByUrl("/dashboard/listofusers");
      }
      else{
        this.toastr.error(res.error,"Error")
      }
      
        
      

    });

  }
  updateUser() {
    
    let data ={
     "id":this.numId,
     "strName":this.UserForm.value.FullName,
     "username":this.UserForm.value.EntityName,
     "employee_Id":this.UserForm.value.EmployeeId,
     "email":this.UserForm.value.EmailAddress,
     "password":this.UserForm.value.Password,
     "mobile":this.UserForm.value.ContactNumber,
     "department_Id":this.UserForm.value.Department,
     "client_Id":this.UserForm.value.Team,
     "designation_Id":this.UserForm.value.Designation,
     "rfId":this.UserForm.value.RFID,
     "location_Id":this.UserForm.value.Location,
     "imageUrl": this.imageUrl,
    }
    this.machineUserService.update(data).subscribe((res:any)=>{
      if( res.statusCode==200){
        this.toastr.success("User created successfuly","Success")
        this.router.navigateByUrl('/dashboard/listofusers')

      }
      else {
        this.toastr.error(res.error,"Error")
      }
    })
  }

  RolesControl = new FormControl([null, Validators.required]);
  Roles: string[] = [];

  onCatRemovedRoles(cat: string) {
    
    for (var i = 0; i <= this.perArray.length; i++) {
      if (this.perArray[i] == cat) {
        this.perArray.splice(i, 1);
      }
      console.log(this.perArray)
    }
    const Roles = this.RolesControl.value as string[];
    this.removeFirst(Roles, cat);
    this.RolesControl.setValue(Roles); // To trigger change detection
  }
  private removeFirst(array: any[], toRemove: any): void {
    
    const index = array.indexOf(toRemove);
    if (index !== -1) {
      array.splice(index, 1);
    }
  }

  PermissionsControl = new FormControl(null, Validators.required);
  PermissionsToTeams: string[] = [];

  onCatRemovedPermissions(cat: string) {
    
    for (var i = 0; i <= this.perArray.length; i++) {
      if (this.perArray[i] == cat) {
        this.perArray.splice(i, 1);
      }
      console.log(this.perArray)
    }
    const PermissionsToTeams = this.PermissionsControl.value as string[];
    this.removeFirst(PermissionsToTeams, cat);
    this.PermissionsControl.setValue(PermissionsToTeams);
  }
  getUserbyId() {
    
    this.machineUserService.getById(this.numId).subscribe((res: any) => {
      
      console.log("edit value of mechine user===>", res);
      this.UserForm.patchValue({
      
        FullName: res.data.strName,

        EntityName: res.data.strName,
        Department: res.data.department_Id,
        Team: res.data.client_Id,
        Designation: res.data.designation_Id,
        EmployeeId: res.data.employee_Id,
        RFID:res.data.rfId,
        ContactNumber: res.data.mobile,
        City: res.data.City,
        Location: res.data.location_Id,
        EmailAddress:res.data.email,
        Password:res.data.password,
        
    
      });
      

this.imageUrl=res.data.image_Url
this.imageStatus=true
this.fileInput = document.getElementById('formFile');


      const file = this.urlToFile(this.imageUrl);
  
      this.fileInput.files = [file];
    })

  }
  password(){
    this.show=!this.show
  }



}

