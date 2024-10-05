import { Component, OnInit, ChangeDetectorRef, NgZone } from '@angular/core';
import { CctvService } from 'src/app/services/cctv-service/cctv.service';
import { LocationService } from 'src/app/services/locationservices/location.service';
import * as signalR from "@microsoft/signalr"
import { DatePipe, formatDate } from '@angular/common';
import { SignalRService } from '../service/signal-r.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cctv',
  templateUrl: './cctv.component.html',
  styleUrls: ['./cctv.component.css'],
  providers: [DatePipe]
})
export class CctvComponent implements OnInit {
  recentVisitors: any[50]=[];
  recentVisitor: any = {name:"Farooq Shad", entryDateTime: "30-04-2024 18:18:54", employeeID:"532424", phone:"03347551833", email:"khalid.haroon@ibex.co", entity: "VW Tech", department:"Product Design UI UX" };
  locations: any[]=[];
  private lastScrollDistance = 0;
  displayedVisitors: any[] = [];
  itemsPerPage = 20;
  currentPage = 1;
  videoUrl="https://youtu.be/EcTbJG965Qg?si=OxfHyjjBv-AN7j3K";
  cameras: any;
  selectedLocation: any = "1";
  intervalId: any;
  selectedCameras: { [key: string]: boolean } = {
    'IN': false,
    'OUT': false
  };
  currentCamera: any = "Both";
  private hubConnection: signalR.HubConnection;

  constructor( private spinner:NgxSpinnerService, private LS: LocationService, 
    private cctvService: CctvService, private toast:ToastrService, 
    private changeDetactorRef: ChangeDetectorRef, private datePipe: DatePipe, 
    private signalRService: SignalRService, private ngZone: NgZone) { }

  ngOnInit(): void {
    const now = new Date();
    this.getLocations();
    this.getData();
    // this.signalRService.startConnection();
    // this.hubConnection = this.signalRService.getConnection;
    this.startConnection();
    this.addTransferChartDataListener();
      // this.intervalId = setInterval(() => {
      //   this.getLocations();
      //   this.getData();
      // }, 60000); 
  }
  getLocations(){
    this.LS.getAllLocations().subscribe((res:any)=>{
      this.locations = res.data;
      console.log("locations response:--->", this.locations);
    })
  }

  getData(){
    
    this.currentCamera;
    this.selectedLocation;
    this.spinner.show();
    this.cctvService.getCctvData(this.selectedLocation, this.currentCamera).subscribe((res:any)=>{
      this.recentVisitors = res?.data;
      this.displayedVisitors = this.recentVisitors?.slice(0, this.itemsPerPage);
      this.spinner.hide();
      if(res.data==null)
        this.toast.error("No Data Found","Error",{positionClass:"toast-bottom-left", timeOut: 1000})
    },
      error => {
        this.spinner.hide();
        this.toast.error("Something Went Wrong","Error",{positionClass:"toast-bottom-left"})
        console.log(error);
      }
    )
  }
  toggleCameraSelection(camera: string): void {
    
    this.selectedCameras[camera] = !this.selectedCameras[camera];
    this.updateCameraSelection();
  }
  
  updateCameraSelection(): void {
    const selectedKeys = Object.keys(this.selectedCameras).filter(key => this.selectedCameras[key]);

    if (selectedKeys.length === 0) {
      this.currentCamera = 'none';
    } else if (selectedKeys.length === 1) {
      this.currentCamera = selectedKeys[0];
    } else {
      this.currentCamera = 'both';
    }
    this.getData()
  }
  transform(value: string): string {
    if (!value) return '';
    const date = new Date(value);
    const formattedDate = formatDate(date, 'dd/MM/yyyy HH:mm', 'en-US');
    return formattedDate;
  }

  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://accesscontrolbackend.enteract.live/SignalRHub')
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
    
    this.hubConnection?.on('SendJsonData', (response: any) => {
      console.log("Received new Data: ", response);
      debugger
      if (response != undefined && response != null) {
        this.ngZone.run(() => {
          this.recentVisitors.unshift(response);
          this.displayedVisitors = this.recentVisitors.slice(0, this.itemsPerPage * this.currentPage);
          console.log("logs", this.recentVisitors);
          this.changeDetactorRef.detectChanges();
        });
      }
    
      // if (response != undefined && response != null) {      
      //   this.recentVisitors.unshift(response[0]);
      //   console.log("logs",this.recentVisitors)
      //   this.changeDetactorRef.detectChanges();
      // }
    }
    );
  }
  loadMore() {
    
    const nextPageVisitors = this.recentVisitors.slice(
      this.currentPage * this.itemsPerPage,
      (this.currentPage + 1) * this.itemsPerPage
    );
    this.displayedVisitors = this.displayedVisitors.concat(nextPageVisitors);
    this.currentPage++;
  }
  removeBottomRecords() {
    if (this.currentPage > 1) {
      const previousPageVisitors = this.recentVisitors.slice(
        0,
        (this.currentPage - 1) * this.itemsPerPage
      );
      this.displayedVisitors = previousPageVisitors;
      this.currentPage--;
    }
  }

  onScroll(event:any){
    
    const distanciaDoTopo = event.srcElement.scrollTop;
    const scrollHeight = event.srcElement.scrollHeight;
    const panelHeight = event.srcElement.clientHeight;

    const distanciaFinalScroll = scrollHeight - panelHeight;

    const limite = distanciaFinalScroll - panelHeight;

    if (
      distanciaDoTopo >= limite &&
      distanciaDoTopo >= this.lastScrollDistance
    ) {
      this.loadMore();
    }
    else if (
      distanciaDoTopo < this.lastScrollDistance && distanciaDoTopo < limite
    ) {
      this.removeBottomRecords();
    }

    this.lastScrollDistance = distanciaDoTopo;

  }
}

