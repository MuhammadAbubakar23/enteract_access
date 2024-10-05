import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavdatashareService {

  private navigationdata=new Subject<string>();

  constructor() { }

  public getData():Observable<string>{
    return this.navigationdata.asObservable();
  }


}
