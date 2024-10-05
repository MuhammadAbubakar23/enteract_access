import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
const baseUrl = environment.baseUrl;
@Injectable({
  providedIn: 'root'
})
export class DevicesDashboardService {

  constructor(private http: HttpClient) { }

  getDevicesData(): Observable<any>{
    
    return this.http.get(baseUrl + `/api/EnteractDashboards/GetDevicesDashboardData`)
  }


}
