import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UseraccountService {

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
    return this.Http.get(this.baseUrl+"enteract.access/UserAccount/All",httpOptions)
  }

  getById(id:any){
    
    var headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
       'Authorization': "Bearer "+localStorage.getItem('token')
    });
    const httpOptions = {
      headers: headers_object
    };
    return this.Http.get(this.baseUrl+"enteract.access/UserAccount/Find/"+id,httpOptions)

  }

  Add(userAccount:any){
    
    var headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
       'Authorization': "Bearer "+localStorage.getItem('token')
    });
    const httpOptions = {
      headers: headers_object
    };
    return this.Http.post(this.baseUrl+"enteract.access/UserAccount/Add",userAccount,httpOptions);
  }


  Update(userAccount:any){
    
    var headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
       'Authorization': "Bearer "+localStorage.getItem('token')
    });
    const httpOptions = {
      headers: headers_object
    };
    return this.Http.post(this.baseUrl+"enteract.access/UserAccount/Update",userAccount,httpOptions);
  }


  Remove(userAccount:any){
    var headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
       'Authorization': "Bearer "+localStorage.getItem('token')
    });
    const httpOptions = {
      headers: headers_object
    };
    return this.Http.post(this.baseUrl+"enteract.access/UserAccount/Remove",userAccount,httpOptions);
  }
}
