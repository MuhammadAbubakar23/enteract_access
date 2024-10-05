import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatashareService {



  private componentData = new Subject<string[]>();
  constructor() { }

  public getMessage(): Observable<string[]> {
    return this.componentData.asObservable();
  }

  public sendMessage(message: any): void {
    return this.componentData.next(message);
  }
}
