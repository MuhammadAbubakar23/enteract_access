import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CardService } from './CardService/card.service';
@Injectable({
  providedIn: 'root'
})

export class WelcomeService {

  constructor(private http: HttpClient,private cardService:CardService) { }

  logsByBuilding(buildingname) {
    
    return this.http.get(`${this.cardService.baseUrl}api/HCNetSDK/GetLiveEventLogs?deviceLocation=${buildingname}`)
  }
}
