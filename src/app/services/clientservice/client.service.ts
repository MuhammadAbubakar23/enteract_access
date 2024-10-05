import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  baseUrl=environment.baseUrl

  constructor(private Http:HttpClient) { }


  getAllData(){
    
    // return this.Http.get(this.baseUrl+"enteract.access/Client/AllTeams",httpOptions)
    return this.Http.get("https://accesscontrolbackend.enteract.live/api/Client/GetAllTeams")

  }


  getAllTeamsInDepartment(){
    
    console.log("this.getAllteamsInDepartment",)

    // return this.Http.get("https://accesscontrolbackend.enteract.live/api/Client/GetAllTeams")
    return this.Http.get(this.baseUrl+'/api/Employees/GetAllTeams')
    console.log
  }

  getAll(data){
    
    return this.Http.post(this.baseUrl+"/api/Client/GetAll",data,httpOptions)
  }

  getbyId(id:number){
    return this.Http.get(this.baseUrl+"enteract.access/Client/Find/"+id,httpOptions)
  }

  Add(team:any){
    
    return this.Http.post(this.baseUrl+"enteract.access/Client/Add",team,httpOptions)
  }
  Remove(team:any){
    
    return this.Http.post(this.baseUrl+"enteract.access/Client/Remove",team,httpOptions)
  }
  Update(client:any){
    return this.Http.post(this.baseUrl+"enteract.access/Client/Update",client,httpOptions)
  }

  getByName(name:string){
    return this.Http.get(this.baseUrl+"enteract.access/Client/FindByName"+name,httpOptions)
  }

  getdetails(id:any,search:string,departmentId:any){
    
    return this.Http.get(this.baseUrl+"enteract.access/Client/Details?id="+id+"&search="+search+"&departmentId="+departmentId,httpOptions)

  }

  deletemultiple(Ids:any){
    return this.Http.post("https://localhost:44364/api/Client/DeleteMultiple",Ids,httpOptions)

  }
}
var headers_object = new HttpHeaders({
  'Content-Type': 'application/json',
   'Authorization': "Bearer "+localStorage.getItem('token')
});
const httpOptions = {
  headers: headers_object
};
