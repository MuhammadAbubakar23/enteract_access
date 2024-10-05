import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  baseUrl=environment.baseUrl

  constructor(public Http:HttpClient) { }

  getAll(){
    // return this.Http.get(this.baseUrl+"enteract.access/Department/All",httpOptions)
    // return this.Http.get("https://accesscontrolbackend.enteract.live/api/Department/GetAll",httpOptions)
    return this.Http.get('https://accesscontrolbackend.enteract.live/api/Employees/GetAllDpartments')
  }
}

var headers_object = new HttpHeaders({
  'Content-Type': 'application/json',
   'Authorization': "Bearer "+localStorage.getItem('token')
});
const httpOptions = {
  headers: headers_object
};
