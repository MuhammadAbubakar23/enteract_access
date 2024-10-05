import { Injectable } from '@angular/core';
import * as signalR from "@microsoft/signalr"

@Injectable({
  providedIn: 'root'
})
export class SignalRService {

  public hubConnection: signalR.HubConnection;
  connection = false;
  constructor() { }

  public startConnection = () => {
    
    if(this.connection = false){
      this.hubConnection = new signalR.HubConnectionBuilder()
        .withUrl('https://accesscontrolbackend.enteract.live/SignalRHub')
        .withAutomaticReconnect()
        .configureLogging(signalR.LogLevel.Information)
        .build();
        
      this.hubConnection
        .start()
        .then(() => {
          console.log('Connection started')
          this.connection = true;
        })
        .catch(err => console.log('Error while starting connection: ' + err))
    }
  }

  get getConnection(){
    return this.hubConnection;
  }
}
