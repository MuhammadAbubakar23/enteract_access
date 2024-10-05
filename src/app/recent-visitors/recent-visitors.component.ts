import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RecentvisitorsService } from '../services/recentvisitorsservice/recentvisitors.service';
// import * as signalR from "@aspnet/signalr"
import * as signalR from "@microsoft/signalr"
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CardService } from '../services/CardService/card.service';
@Component({
  selector: 'app-recent-visitors',
  templateUrl: './recent-visitors.component.html',
  styleUrls: ['./recent-visitors.component.css']
})
export class RecentVisitorsComponent implements OnInit {

  topvisitors: any[] = [];
  FirsOne: any = this.topvisitors[0];
  url: any;
  Visitor_Name: any;
  Designation: any;
  Department: any;
  Location: any;
  Log_Time: any;
  dateTimeNow: Date = new Date;

  visitor: {
    strName?: any,// visitorname
    employee_Id: any;
    department?: any,// de[artment]
    designation?: any//
    Location: any,
    image: any;
    card_No: any;
    log_Time: any;
    door_No: any;
    Time_Difference: any;

  } = { strName: "Default", employee_Id: "default", department: "Default", designation: "Default", Location: "Default", image: null, card_No: "default", log_Time: this.dateTimeNow, door_No: 0, Time_Difference: 0 };
  data: any[] = [this.visitor];


  // 'https://localhost:44364/LogsHub'
  // 'https://localhost:43258/LogsHub'
  //'https://eas.360scrm.com/LogsHub'


  constructor(private rvService: RecentvisitorsService,
    private http: HttpClient,
    private changeDetactorRef: ChangeDetectorRef,
    private cardService:CardService) { }

  ngOnInit(): void {
    this.startConnection();
    this.addTransferChartDataListener();
  }

  connectiourl: string = this.cardService.baseUrl + environment.visitorUrl
  private hubConnection: signalR.HubConnection
  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:43258/LogsHub')
      // `${this.cardService.baseUrl}LogsHub`
      .withAutomaticReconnect()
      .configureLogging(signalR.LogLevel.Information)
      .build();
    this.hubConnection
      .start()
      .then(() => {
        console.log('Connection started')
      })
      .catch(err => console.log('Error while starting connection: ' + err))
  }


  public addTransferChartDataListener = () => {
    this.hubConnection.on('getAllMachineLogs', (response: any) => {

      if (response != undefined && response != null) {
    
        this.Log_Time = new Date(response.log_Time);
        if (this.Log_Time > new Date(this.data[0].log_Time)) {
          
          this.data.unshift(response);
          this.visitor.strName = response.strName;
          this.visitor.department = response.department;
          this.visitor.designation = response.designation;
          this.visitor.Location = response.location;
          this.visitor.Time_Difference = response.time_Difference;
          this.Log_Time.setMinutes(this.Log_Time.getMinutes() - response.time_Difference);
          this.visitor.log_Time = this.Log_Time;
          this.visitor.image = response.profile_Image;
        }

        //console.log("Unshifted data======>", this.data)
        this.changeDetactorRef.detectChanges();

      }
    }
    );
  }


  onImgError(event: any) {

    event.target.src = '../../assets/Images/unknownuser.png';

  }

  getRecentVisitors() {
    this.rvService.getRecentVisitors().subscribe((res: any) => {
      this.topvisitors = res;
      console.log(res);

    })
  }

}
