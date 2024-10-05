import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Identifiers } from '@angular/compiler/src/render3/r3_identifiers';
import { Injectable } from '@angular/core';
import { resourceUsage } from 'process';
import { BehaviorSubject, Subject } from 'rxjs';
import { Device } from 'src/app/layouts/shared/models/DeviceDto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  baseUrl=environment.baseUrl;

  

  filter = {
    make: "",
    type: "",
    status: "",
    search: "",
  }

  constructor(private Http:HttpClient) { }

  addDevice(form:any){

    var headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
       'Authorization': "Bearer "+localStorage.getItem('token')
    });
    const httpOptions = {
      headers: headers_object
    };

    
    console.log("devices data of form===>",form)
    // return this.Http.post(this.baseUrl+'enteract.access/Device/Add',form,httpOptions)
    return this.Http.post('https://accesscontrolbackend.enteract.live/api/Device/AddDevice',form,httpOptions)
    // return this.Http.post('http://localhost:43258/api/Device/AddDevice',form,httpOptions)
  }

  getDevices(data:any){
    
    var token = localStorage.getItem('token');
    var headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
       'Authorization': "Bearer "+localStorage.getItem('token')
    });
    const httpOptions = {
      headers: headers_object
    };
      return this.Http.post('https://accesscontrolbackend.enteract.live/api/Device/GetAllDevices',data,httpOptions)
      // return this.Http.post('http://localhost:43258/api/Device/GetAllDevices',data,httpOptions)
  }


  getDevicesWithoutFilters(){
    var headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
       'Authorization': "Bearer "+localStorage.getItem('token')
    });
    const httpOptions = {
      headers: headers_object
    };
    
    return this.Http.get(this.baseUrl+"enteract.access/Device/AllDevices",httpOptions)
    // return this.Http.get('http://localhost:43258/api/Device/AllDevices",httpOptions')
  }

  deleteDevice(id:number[]){
    const headers = new HttpHeaders({
  'Content-Type': 'application/json',
   'Authorization': "Bearer "+localStorage.getItem('token')
});
const httpOptions = {
    headers: headers,
    //body: id,
    body: id
}
console.log("deletedDevices ===>@  ",id)


return this.Http.delete('https://accesscontrolbackend.enteract.live/api/Device/DeleteDeviceById',httpOptions);
   
    
  }
  updateStautsDevice(id:number){
    var headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
       'Authorization': "Bearer "+localStorage.getItem('token')
    });
    const httpOptions = {
      headers: headers_object
    };
    
    console.log("update status of devies===>",id)
    return this.Http.put(`https://accesscontrolbackend.enteract.live/api/Device/ToggleActivityStatus?id=${id}`,httpOptions);
  }

  updateDevice(data:any){
    var headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
       'Authorization': "Bearer "+localStorage.getItem('token')
    });
    const httpOptions = {
      headers: headers_object,

      
    };
    console.log("update the devices===> @@@@",data)

   return this.Http.post("https://accesscontrolbackend.enteract.live/api/Device/UpdateDevice",data,httpOptions)

  }
getDeviceLocation(){
  return this.Http.get(this.baseUrl+"/api/Location/GetAllLocs")
}
  getDevice(id:any){
    var headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
       'Authorization': "Bearer "+localStorage.getItem('token')
    });
    const httpOptions = {
      headers: headers_object,
    
    };
    
    console.log("Edit devices by id form the api services====>",id)
    // let url=this.baseUrl+"enteract.access/Device/Find/"+id
    let  url = this.baseUrl+ "/api/Device/GetById/" + id
    return this. Http.get(url,httpOptions)

    // return this.Http.get(url,httpOptions);
    // return this.Http.get(" https://accesscontrolbackend.enteract.live/api/Device/GetById",id)  
  } 


  detailPage(id:any,startDateTime:any,endDateTime:any,pageNo:any,itemsPerPage:any,employeeId:any){
    var headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
       'Authorization': "Bearer "+localStorage.getItem('token')
    });
    const httpOptions = {
      headers: headers_object
    };   
    return this.Http.get(this.baseUrl+"enteract.access/Device/Details?id="+id+"&startDateTime="+startDateTime+"&endDateTime="+endDateTime+"&pageNo="+pageNo+"&itemsPErPage="+itemsPerPage+"&employeeId="+employeeId,httpOptions)
  }

  getDeviceLogs(ipAddress:any){
    var headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
       'Authorization': "Bearer "+localStorage.getItem('token')
    });
    const httpOptions = {
      headers: headers_object
    };
    return this.Http.get(this.baseUrl+"/enteract.access/Device/GetLogs/"+ipAddress, httpOptions)
  }

  deletemultipledevices(ids:any)
  {
    var headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
       'Authorization': "Bearer "+localStorage.getItem('token')
    });
    const httpOptions = {
      headers: headers_object
    };
    return this.Http.post(this.baseUrl+"Device/RemoveList",ids,httpOptions)
  }


  disablemultipledevices(ids:any){
    var headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
       'Authorization': "Bearer "+localStorage.getItem('token')
    });
    const httpOptions = {
      headers: headers_object
    };
    return this.Http.post("https://accesscontrolbackend.enteract.live/api/Device/DisableMultiple",ids,httpOptions)
  }



}

