import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  baseUrl=environment.baseUrl;

  constructor(private Http:HttpClient) { }


  Add(permission:any){
    
    return this.Http.post(this.baseUrl+"enteract.access/Permissions/Add",permission,httpOptions)
  }

  getByName(name:any){
    return this.Http.get(this.baseUrl+"enteract.access/Permissions/GetPermission/"+name,httpOptions)

  }

  getAll(search:string){
    return this.Http.get('https://accesscontrolbackend.enteract.live/api/Permissions/GetAll'+search,httpOptions)
  }

  delete(id:any){
    
    return this.Http.get(this.baseUrl+"enteract.access/Permissions/Remove/"+id,httpOptions)
  }
}


var headers_object = new HttpHeaders({
  'Content-Type': 'application/json',
   'Authorization': "Bearer "+localStorage.getItem('token')
});
const httpOptions = {
  headers: headers_object
};