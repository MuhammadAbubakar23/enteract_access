import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, Subject, retry } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class CardService {
  //baseUrl = "http://10.109.5.75/"
  //baseUrl = "https://10.111.32.93:45456/"
  //baseUrl = "https://accesscontrolbackend.enteract.live/"
  //baseUrl = "https://10.111.32.93:45457/"
  //baseUrl = "https://10.111.11.127:45455/"
  //baseUrl = "https://eas.360scrm.com/"
   baseUrl = 'https://accesscontrolbackend.enteract.live/'
  // baseUrl="https://10.111.11.127:45456/"
  // /baseUrl="https://eauiibex3.360scrm.com/"
      


  constructor(private http: HttpClient) {

  }

  getAllCards(text: any ,pageNumber:any,pageSize:any ,sort:string) {
    // var headers_object = new HttpHeaders({
    //   'Content-Type': 'application/json',
    //   'Authorization': "Bearer " + localStorage.getItem('token')
    // });
    // const httpOptions = {
    //   headers: headers_object
    // };
   
    
       return this.http.get(`${this.baseUrl}api/AccessCard/GetAllAccessCardsInfo?text=${text}&pageNumber=${pageNumber}&pageSize=${pageSize}&sort=${sort} `)
      // return this.http.get(`http://localhost:43258/api/AccessCard/GetAllAccessCardsInfo?text=${text}&pageNumber=${pageNumber}&pageSize =${pageSize}&sort=${sort} `)
  }
  editcard(cardId:number):Observable<any>{
    
    console.log("edit api==>",cardId)
     return this.http.get(`${this.baseUrl}api/AccessCard/GetAccessCardById?cardId=${cardId}`)
    // return this.http.get(`http://localhost:43258/api/AccessCard/GetAccessCardById?cardId=${cardId}`)
  
  }

  machines(data: any) {
    
    return this.http.get('https://accesscontrolbackend.enteract.live/api/AccessCard/GetAllAccessCardsInfo', data)
  }
  addCard(data: any): Observable<any> {
    console.log("added==>data",data);

    
 if(data.deviceIds.length===0){
  return data

 }
 console.log("data@@@@@@###====>",data)
    
    if(data.expiryDate===null || data.expiryDate===undefined){
      data.expiryDate=new Date()
    }
  
    
    //var deviceIds=ids.join(',');
     return this.http.post(`https://accesscontrolbackend.enteract.live/api/AccessCard/RegisterAccessCardToDB`, data);
    // return this.http.post(`http://localhost:43258/api/AccessCard/RegisterAccessCardToDB`, data);

  }
  loginToDevice(data: any) {
    var headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + localStorage.getItem('token')
    });
    const httpOptions = {
      headers: headers_object
    };
    return this.http.post(`${this.baseUrl}api/AccessCard/LoginMachine?ipAddress=${data.ipAddress}&username=${data.username}&port=${data.port}&password=${data.password}`, httpOptions)
  }

  deleteAccessToDevice(id: number[]) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
       'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    const httpOptions = {
      headers: headers,
      body:id
    
    };
  console.log("body ids=====>",id)
    
      return this.http.delete('https://accesscontrolbackend.enteract.live/api/AccessCard/DeleteAccessCardById',httpOptions)
      // return this.http.delete('http://localhost:43258/api/AccessCard/DeleteAccessCardById',httpOptions)
  }
  
  uploadFile(formData) {
    console.log("formData==>", localStorage.getItem('deviceId'))
    var headers_object = new HttpHeaders({
      'Content-Type': 'multipart/form-data',
      'Authorization': "Bearer " + localStorage.getItem('token')
    });
    const httpOptions = {
      headers: headers_object
    };

   
    return this.http.post('https://accesscontrolbackend.enteract.live/api/AccessCard/ExcelExtractData?deviceId', formData)
  }
  successuploadFile(data) {
    console.log("formData==>", localStorage.getItem('deviceId'))
    var headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + localStorage.getItem('token')
    });
    const httpOptions = {
      headers: headers_object
    };

    return this.http.post('https://accesscontrolbackend.enteract.live/api/AccessCard/BulkRegisterAccessCardToDatabase', data)
  }


  getDevicesByLocation(cityId: any): Observable<any> {
     
    return this.http.get('https://accesscontrolbackend.enteract.live/api/Location/GetAllLocations/' + cityId);
  }
  // getAccessPointsByCity(cityId: any): Observable<any>{
  //   
  //   let data={
  //     Page_No:1,
  //     ItemsPerPage:100,
  //     Search:"",
  //     City_Id: cityId,
  //     Location_Id:0,
  //     Floor_Id:0,
  //     Sort:""
  //   }
  //   return this.http.post('https://accesscontrolbackend.enteract.live/api/AccessPoint/GetAll', + data);
  // }

  getdevices(ids: any[]): Observable<any> {
    
    var locIds = ids.join(',');
    return this.http.get('https://accesscontrolbackend.enteract.live/api/Device/GetDevicesByLocationIds?locationIds=' + locIds);
  }
  getDevicesByAccessPoint(id: any): Observable<any>{
    return this.http.get('https://accesscontrolbackend.enteract.live/api/Device/GetDevicesByAccessPointId?id='+ id);
  }
  getCards(info: any[]) {
    
    return this.http.post('https://accesscontrolbackend.enteract.live/api/AccessCard/GetAllAccessCardsInfo', + info)
  }
   downloadedCvs(data: any): Observable<any> {
     return this.http.post('https://accesscontrolbackend.enteract.live/api/AccessCard/DeleteAccessCardFromDevice', data);
   
  }
  updataCard(data):Observable<any>{
  console.log("The updated data====>",data)
    return this.http.put("https://accesscontrolbackend.enteract.live/api/AccessCard/UpdateAccessCardInfo",data)
    // return this.http.put("http://localhost:43258/api/AccessCard/UpdateAccessCardInfoV2",data)
  }

updateCardStatus(tagsId: string, tag: any) {
  const url = `https://accesscontrolbackend.enteract.live/api/AccessCard/ToggleCardAccess?id=${tagsId}`;
  // const url = `http://localhost:43258/api/AccessCard/ToggleCardAccess?id=${tagsId}`;
  return this.http.post(url, tag);
}
}
