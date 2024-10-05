import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { Register } from '../../layouts/shared/models/RegisterDto';
import { environment } from 'src/environments/environment';
import { Login } from '../../layouts/shared/models/LoginDto';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthservicesService {
  private user:any
  baseUrl=environment.baseUrl;

  constructor(private http:HttpClient) { }

  registerUser(register:Register){
    
    console.log("Api Register===>",register)
    return this.http.post(this.baseUrl+'/api/Auth/Registeration',register)
  }
   loginuser:any;

  loginUser(login:Login): Observable<any> {
    console.log("the login====>",login)
    this.loginuser=login.Username 
     console.log("this.loginusern====>>>",this.loginuser)
     localStorage.setItem('username', this.loginuser);
    
    return this.http.post('https://accesscontrolbackend.enteract.live/api/Auth/UserLogin',login)
  }
  // loginUser(login: Login): Observable<any> {
  //   console.log("the login====>", login);
  //   
  //   return this.http.post('https://accesscontrolbackend.enteract.live/api/Auth/UserLogin', login)
  //     .subscribe(response => {
  //       // Assuming the response contains a property called 'userName'
  //       this.loggedInUser = response.userName;
  //     });
  // }
  

  getRoles(){
    return this.http.get(this.baseUrl+"enteract.access/Auth/AllRoles",httpOptions)
  }
// add user name
 activeUsers: string[] = [];

  addUser(username: string) {
    this.activeUsers.push(username);
  }

  removeUser(username: string) {
    const index = this.activeUsers.indexOf(username);
    if (index !== -1) {
      this.activeUsers.splice(index, 1);
    }
  }

}
var headers_object = new HttpHeaders({
  'Content-Type': 'application/json',
   'Authorization': "Bearer "+localStorage.getItem('token')
});
const httpOptions = {
  headers: headers_object
};
