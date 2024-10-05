import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
const baseUrl = environment.baseUrl;
@Injectable({
  providedIn: 'root'
})
export class VehiclesDashboardService {

  constructor(private http: HttpClient) { }

  getVehiclesData(data): Observable<any>{
    
    return this.http.get(baseUrl + `/api/EnteractDashboards/GetVehiclesDashboardData?Location=${data.Location}&StartDT=${data.StartDT}`)
  }

}
