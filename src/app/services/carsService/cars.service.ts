import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
const baseUrl = environment.baseUrl;
@Injectable({
  providedIn: 'root'
})
export class CarsService {

  constructor( private http: HttpClient) { };

  getAllCars(): Observable<any> {
    return this.http.get(baseUrl + "/api/VehicleManagement/GetAllCar");
  }

  getCarDetails(id: any): Observable<any> {
    return this.http.get(baseUrl + `/api/VehicleManagement/GetCarDetails?VehicalId=${id}`, id);
  }

  removeCarDetails(id: any): Observable<any> {
    return this.http.post(baseUrl + `/api/VehicleManagement/RemoveCarDetails?VehicalId=${id}`, id);
  }
  
  updateCarDetails(data): Observable<any> {
    return this.http.post(baseUrl + "/api/VehicleManagement/UpdateCarDetails", data);
  }

  addCar(data): Observable<any> {
    return this.http.post(baseUrl + "/api/VehicleManagement/AddNewCar", data);
  }

  GetUsers(id:any): Observable<any> {
    
    return this.http.get(baseUrl + `/api/UserTeams/GetUserAccountDetailsById?EmployeeID=${id}`)
  }

}
