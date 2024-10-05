import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MachineService {

  baseUrl = environment.baseUrl;

  constructor(private Http: HttpClient) { }

  getDesingation(){
    return this.Http.get("https://accesscontrolbackend.enteract.live/api/Designation/GetAll");
  }

  GetAllUserList(data: any): Observable<any> {
    return this.Http.post(this.baseUrl + '/api/UserTeams/GetAllUserList', data)
    // return this.Http.post('https://differentgreyroof87.conveyor.cloud/api/UserTeams/GetAllUserList', data)
    // return this.Http.post( this.baseUrl+'/api/MachineUser/GetAll',data, httpOptions)
  //  return this.Http.post('https://accesscontrolbackend.enteract.live/api/Employees/GetAllFiltered',data)
  }

  getById(id: any) {
    var headers_object = new HttpHeaders({
      'Content-Type': 'multipart/form-data',
      'Authorization': "Bearer " + localStorage.getItem('token')
    });
    const httpOthion = {
      headers: headers_object,
      
    };
    
    console.log("edit user data is coming form api ===>",id);
     return this.Http.get(`https://accesscontrolbackend.enteract.live/api/MachineUser/GetById/${id}`,httpOptions)

  }

  postUser(data:any) {
    // var headers_object = new HttpHeaders({
    //   // 'Content-Type': 'multipart/form-data',
    //   'Authorization': "Bearer " + localStorage.getItem('token')
    // });
    // const httpOptions = {
    //    headers: headers_object,

     
    // };
    
     return this.Http.post("https://accesscontrolbackend.enteract.live/api/MachineUser/Add",data) 
    // / this.Http.post("http://10.111.11.127:45455/api/MachineUser/Add",data) 
  }

  fileupload(data){
    
    return this.Http.post("https://accesscontrolbackend.enteract.live/api/MachineUser/ExcelExtractData",data)
  }







  postUserasBulk(data) {
    const headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization':"Bearer"+ localStorage.getItem('token')
    
  });
  const  httpOptions ={
    headers :headers,
  
  }

    
     return this.Http.post("https://accesscontrolbackend.enteract.live/api/MachineUser/MachineUserBulk",data )
    // return this.Http.post("https://10.111.11.127:45455/api/MachineUser/MachineUserBulk",data ,httpOptions)
  }

  update(data: any) {
    
    console.log(" updated user with api===>",data)
  //  return this.Http.post(this.baseUrl + "enteract.access/MachineUser/Update", user, httpOptions)
     return this.Http.post ("https://accesscontrolbackend.enteract.live/api/MachineUser/update" ,data,httpOptions)
  }

  remove(Ids) {
    var headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + localStorage.getItem('token')
    });
    const httpOptions = {
      headers: headers_object,
   
   
    };
    console.log("the remoce user ===>",Ids)
    
    return this.Http.post("https://accesscontrolbackend.enteract.live/api/MachineUser/DisableMultiple" ,[Ids])
  }

  userDetail(id:any){
    return this.Http.get(this.baseUrl+"/api/MachineUser/UserDetail/"+id,httpOptions)
  }

  GetUserAccountDetails(data:any){
    return this.Http.get(this.baseUrl+`/api/UserTeams/GetUserAccountDetails?EmployeeID=${data.id}&StartDateTime=${data.StartDateTime}&EndDateTime=${data.EndDateTime}`)
  }
  uploadImage(data:FormData, id:any){
    
    return this.Http.post(`https://accesscontrolbackend.enteract.live/api/UserTeams/UploadEmployeeImage?EmployeeID=${id}`,data)
  }
  imageUpload(data:FormData){
    
    return this.Http.post("https://accesscontrolbackend.enteract.live/api/MachineUser/ImageUpload",data)
  }
  imageUploadFaceDetection(data: FormData){
     return this.Http.post("https://accesscontrolbackend.enteract.live/api/MachineUser/ImageUploadForFaceDetection",data)
  // return this.Http.post("http://localhost:43258/api/MachineUser/ImageUploadForFaceDetection",data)
  }

  deletemultiple(Ids:any) {
    
    // var  data = {ids: Ids};
    return this.Http.post("https://accesscontrolbackend.enteract.live/api/MachineUser/DeleteMultiple", Ids,httpOptions)
  }


}
var headers_object = new HttpHeaders({
  'Content-Type': 'application/json',
  'Authorization': "Bearer " + localStorage.getItem('token')
});
const httpOptions = {
  headers: headers_object
};

