import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  
  baseUrl=environment.baseUrl;


  constructor(public Http:HttpClient) { }

  getLocByCity(city_id:any){
    
    var headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
       'Authorization': "Bearer "+localStorage.getItem('token')
    });
    const httpOptions = {
      headers: headers_object
    };
    let url=this.baseUrl+"enteract.access/Location/LocOnCity/"+city_id;
    return this.Http.get(url,httpOptions)

  }

  getAllLocations(){
    var headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
       'Authorization': "Bearer "+localStorage.getItem('token')
    });
    const httpOptions = {
      headers: headers_object
    };
    // return this.Http.get(this.baseUrl+"enteract.access/Location/AllLocs",httpOptions)
    return this.Http.get("https://accesscontrolbackend.enteract.live/api/Location/GetAllLocs",httpOptions)

  }

  getAll(data){
    
    var headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
       'Authorization': "Bearer "+localStorage.getItem('token')
    });
    const httpOptions = {
      headers: headers_object
    };

    return this.Http.post(this.baseUrl+"/api/Location/GetAll",data,httpOptions)
  }

  getbyId(locid:any){
    
    var headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
       'Authorization': "Bearer "+localStorage.getItem('token')
    });
    const httpOptions = {
      headers: headers_object
    };
    let url=this.baseUrl+"enteract.access/Location/Find/"+locid;
    return this.Http.get(url,httpOptions)

  }

  Add(location:any){
    var headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
       'Authorization': "Bearer "+localStorage.getItem('token')
    });
    const httpOptions = {
      headers: headers_object
    };
    
    return this.Http.post(this.baseUrl+"enteract.access/Location/Add",location,httpOptions)
  }

  Remove(location:any){
    var headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
       'Authorization': "Bearer "+localStorage.getItem('token')
    });
    const httpOptions = {
      headers: headers_object
    };
    return this.Http.post(this.baseUrl+"enteract.access/Location/Remove",location,httpOptions)
  }

  deleteMultiple(ids:any){
    var headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
       'Authorization': "Bearer "+localStorage.getItem('token')
    });
    const httpOptions = {
      headers: headers_object
    };
    return this.Http.post("https://localhost:44364/api/Location/DeleteMultiple",ids,httpOptions)
  }
  Update(location:any){
    var headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
       'Authorization': "Bearer "+localStorage.getItem('token')
    });
    const httpOptions = {
      headers: headers_object
    };
    return this.Http.post(this.baseUrl+"enteract.access/Location/Update",location,httpOptions)
  }

}



