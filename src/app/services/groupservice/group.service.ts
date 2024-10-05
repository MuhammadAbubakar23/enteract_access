import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  baseUrl=environment.baseUrl

  constructor(private Http:HttpClient) { }

  getAll(){
    
    // return this.Http.get(this.baseUrl+"enteract.access/Group/All",httpOptions)
    return this.Http.get("https://accesscontrolbackend.enteract.live/api/Group/GetAll",httpOptions)
  }
  
  getById(id:any){
    
    return this.Http.get(this.baseUrl+"enteract.access/Group/Find/"+id,httpOptions)
  }

  Add(group:any){
    
    return this.Http.post(this.baseUrl+"enteract.access/Group/Add",group,httpOptions)
  }

  update(group:any){
    return this.Http.post(this.baseUrl+"enteract.access/Group/Update",group,httpOptions)
  }

  remove(group:any){
    return this.Http.post(this.baseUrl+"enteract.access/Group/Remove",group,httpOptions)
  }

}

var headers_object = new HttpHeaders({
  'Content-Type': 'application/json',
   'Authorization': "Bearer "+localStorage.getItem('token')
});
const httpOptions = {
  headers: headers_object
};

