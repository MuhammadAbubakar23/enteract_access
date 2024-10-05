import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
const baseUrl = environment.baseUrl;
@Injectable({
  providedIn: 'root'
})
export class ExecutiveDashboardService {

  constructor( private http: HttpClient ) { }

  getExecutiveDashboard(data:any): Observable<any> {
    return this.http.get(baseUrl + `/api/EnteractDashboards/GetExecutiveDashboardData?Department=${data.Department}&Location=${data.Location}&StartDT=${data.StartDT}`);
  }

}
