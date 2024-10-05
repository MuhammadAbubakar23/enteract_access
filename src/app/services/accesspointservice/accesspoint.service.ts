import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccesspointService {

  baseUrl=environment.baseUrl;

  constructor(private Http:HttpClient) { }

  getAll(data){
    var headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
       'Authorization': "Bearer "+localStorage.getItem('token')
    });
    const httpOptions = {
      headers: headers_object
    };

    // return this.Http.post(this.baseUrl+"enteract.access/AccessPoint/All",data,httpOptions)
    return this.Http.post(this.baseUrl+"/api/AccessPoint/GetAll",data,httpOptions)
  }

  getByLoc(loc_id:any){
    var headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
       'Authorization': "Bearer "+localStorage.getItem('token')
    });
    const httpOptions = {
      headers: headers_object
    };

    return this.Http.get(this.baseUrl+"enteract.access/AccessPoint/FindByLocation/"+loc_id,httpOptions)

  }

  getById(id:any){
    var headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
       'Authorization': "Bearer "+localStorage.getItem('token')
    });
    const httpOptions = {
      headers: headers_object
    };

    return this.Http.get(this.baseUrl+"enteract.access/AccessPoint/Find/"+id,httpOptions)
  }

  Add(accesspoint:any){
    
    var headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
       'Authorization': "Bearer "+localStorage.getItem('token')
    });
    const httpOptions = {
      headers: headers_object
    };

    return this.Http.post(this.baseUrl+"enteract.access/AccessPoint/Add",accesspoint,httpOptions)
  }

  Remove(acc_id:any){
    
    var headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
       'Authorization': "Bearer "+localStorage.getItem('token')
    });
    const httpOptions = {
      headers: headers_object
    };

    return this.Http.get(this.baseUrl+"enteract.access/AccessPoint/Remove/"+acc_id,httpOptions)

  }

  deletemultiple(ids:any)
  {
    var headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
       'Authorization': "Bearer "+localStorage.getItem('token')
    });
    const httpOptions = {
      headers: headers_object
    };
    return this.Http.post("https://localhost:44364/api/Accesspoint/DeleteMultiple",ids,httpOptions)
  }

  Update(accesspoint:any){
    var headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
       'Authorization': "Bearer "+localStorage.getItem('token')
    });
    const httpOptions = {
      headers: headers_object
    };

    return this.Http.post(this.baseUrl+"enteract.access/AccessPoint/Update",accesspoint,httpOptions)
  }
}
