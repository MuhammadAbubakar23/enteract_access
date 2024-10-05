import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from 'src/app/services/clientservice/client.service';
import { DepartmentService } from 'src/app/services/departmentservice/department.service';

@Component({
  selector: 'app-teamdetail',
  templateUrl: './teamdetail.component.html',
  styleUrls: ['./teamdetail.component.css']
})
export class TeamdetailComponent implements OnInit {

  departments:any;
  depId:any=0;
  search:string="";
  teamMembers:any;
  totalpages: any;
  p:any=1;

  id=Number(this.activatedRoute.snapshot.params["id"]);
  team: any;

  constructor(private depService:DepartmentService,
              private clientService:ClientService,
              private activatedRoute:ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.getAllDepartments();
    this.getAllMembers();
  }
  
  getAllDepartments() {
    this.depService.getAll().subscribe((res: any) => {
      this.departments = res.data;
    })
  }

  getAllMembers(){
    
    this.clientService.getdetails(this.id,this.search,this.depId).subscribe((res:any)=>{
      this.teamMembers=res.data.result;
      this.team=res.data.teaminfo;
      console.log("The team is=====>",this.team);
      
    })

  }

  masterSelected = false;

  checkUncheckAll(evt) {
    
    this.teamMembers.forEach((c) => c.isChecked = evt.target.checked)

    this.masterSelected = this.teamMembers.every((l) => l.isChecked == true);
    
      
  }

  isAllSelected(evt, index) {
    

    this.teamMembers[index].isChecked = evt.target.checked
    this.masterSelected = this.teamMembers.every((l) => l.isChecked == true);
    
  }

  NextPage(p: any) {
    let page = p + 1;
    
    if (p < this.totalpages) {
      
      this.p = page;
      this.getAllMembers();
    }
    this.p;
  }

  PreviousPage(p: any) {
    
    if (p >= 1) {
      let page = p - 1;
      if(page>0){
        this.p = page;
      this.getAllMembers();
      
      }
    }

  }

  reloadComponent() {
    // let currentUrl = this.router.url;
    // this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    // this.router.onSameUrlNavigation = 'reload';
    // this.router.navigate([currentUrl]);

    this.p=1;
    this.getAllDepartments();
    
   
    this.masterSelected = this.teamMembers.every((l) => l.isChecked == false);
    this.teamMembers.forEach((c) => c.isChecked = false);
    
    
  }

}
