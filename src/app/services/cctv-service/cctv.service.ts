import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
const baseUrl = environment.baseUrl;
// const baseUrl = 'http://10.111.11.146:45457';
@Injectable({
  providedIn: 'root'
})
export class CctvService {

  constructor( private http: HttpClient ) { }

  getCctvData(locationId:any, CameraSide:any): Observable<any> {
    return this.http.get(baseUrl + "/api/GroupFacialRecognition/GetRecentLogsByLocationDevice?LocationId=" + locationId + "&CameraSide=" + CameraSide);
  }
  getCctvCarData(locationId:any, CameraSide:any): Observable<any> {
    return this.http.get(baseUrl + "/api/ANPR/GetAllRecentCapturedLogsANPR?LocationId=" + locationId + "&CameraSide=" + CameraSide);
  }
}
