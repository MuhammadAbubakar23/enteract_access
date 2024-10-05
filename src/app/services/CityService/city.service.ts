import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  baseUrl=environment.baseUrl;

  constructor(private Http:HttpClient) { }

  getAll(){
    var headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
       'Authorization': "Bearer "+localStorage.getItem('token')
    });
    const httpOptions = {
      headers: headers_object
    };
    return this.Http.get(this.baseUrl+"/api/City/GetAll")
  }
}
