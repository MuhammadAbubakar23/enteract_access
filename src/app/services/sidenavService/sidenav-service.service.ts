import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root'
})
export class SidenavServiceService {

  private siblingMsg2 = new Subject<string>();
  
  constructor() { }

   /*
   * @return {Observable<string>} : siblingMsg
   */
   public getMessage(): Observable<string> {
    return this.siblingMsg2.asObservable();
  }
  /*
   * @param {string} message : siblingMsg
   */
  public updateMessage(message2: string): void {
  
    this.siblingMsg2.next(message2);
  }
}
