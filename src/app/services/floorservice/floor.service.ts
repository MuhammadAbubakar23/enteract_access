import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FloorService {

  baseUrl=environment.baseUrl

  constructor(public Http:HttpClient) { }

  getAll(){
    return this.Http.get(this.baseUrl+"enteract.access/Floor/All",httpOptions)
  }

  getAllByLocation(loc_Id:any){
    return this.Http.get(this.baseUrl+"enteract.access/Floor/All/"+loc_Id,httpOptions)
  }

}

var headers_object = new HttpHeaders({
  'Content-Type': 'application/json',
   'Authorization': "Bearer "+localStorage.getItem('token')
});
const httpOptions = {
  headers: headers_object
};
