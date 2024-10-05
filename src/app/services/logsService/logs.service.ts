import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LogsService {

  baseUrl = environment.baseUrl

  constructor(private Http: HttpClient) { }

  getAll(data) {
    
    var headers_object = new HttpHeaders({
      //'Content-Type': 'application/json',
      'Authorization': "Bearer " + localStorage.getItem('token')
    });
    const httpOptions = {
      headers: headers_object
    };
    //  return this.Http.post(this.baseUrl + "enteract.access/MachineLogs/All", data, httpOptions)
    // return this.Http.post('http://localhost:43258/api/MachineLogs/GetAll' ,data,httpOptions)
    return this.Http.post(this.baseUrl +"/api/MachineLogs/GetAll" ,data,httpOptions)
  }

}
