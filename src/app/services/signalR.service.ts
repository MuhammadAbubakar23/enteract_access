import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { CardService } from './CardService/card.service';
import { MachineService } from './machineuserservice/machine.service';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

export class SignalRService {
  progressSubject = new BehaviorSubject<any>(null);
  progressValue$ = this.progressSubject.asObservable()
  constructor(private cardService:CardService,
    private machinuser:MachineService) { }
  private hubConnection: HubConnection;

  startConnection(): void {

    console.log('starting connection');
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(`${this.machinuser.baseUrl}/ProgressHub`)
      .build();

    this.hubConnection.on('ShowPercentage', (percent: number) => {
      
      //this.progress = percent;
      console.log("percent===>", percent)
      this.progressSubject.next(percent)
    });

    this.hubConnection.start()
      .then(() => console.log('SignalR connection established.'))
      .catch(err => console.error(err));
  }
  
  // Makeconection():void{
  //    console.log("Make the connection is stared")
  //    this.hubConnection =new HubConnectionBuilder().withUrl(`${this.machinuser.baseUrl}ProgressHub`).build();
  //    this.hubConnection.on('ShowPercentage',(percent:number)=>{
  //     console.log("the percent==>",percent)
  //     this.progressSubject.next(percent)
  //    });
  //   //  this.hubConnection.start()
  //   //  .then(()=>console.log("SingalR connection is established now"))
  //   //  .catch(err=>console.log(err))
  // }
 

}
