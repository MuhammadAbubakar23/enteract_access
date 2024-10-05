import { ChangeDetectorRef, Component, HostListener, NgZone, OnInit } from '@angular/core';
import { CctvService } from 'src/app/services/cctv-service/cctv.service';
import { LocationService } from 'src/app/services/locationservices/location.service';
import { DatePipe } from '@angular/common';
import * as signalR from "@microsoft/signalr"
import { SignalRService } from '../service/signal-r.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cctv-car',
  templateUrl: './cctv-car.component.html',
  styleUrls: ['./cctv-car.component.css'],
  providers: [DatePipe]
})
export class CctvCarComponent implements OnInit {
  recentVisitors: any[]= [];
  locations: any[]=[];
  cameras: any;
  intervalId: any;
  private lastScrollDistance = 0;
  displayedVisitors: any[] = [];
  itemsPerPage = 20;
  currentPage = 1;
  selectedLocation: any = "1";
  selectedCameras: { [key: string]: boolean } = {
    'IN': false,
    'OUT': false
  };
  currentCamera: any = "Both";
  private hubConnection: signalR.HubConnection;

  constructor(private LS: LocationService, private toast:ToastrService, 
    private cctvService: CctvService, private spinner:NgxSpinnerService, 
    private datePipe: DatePipe, private changeDetactorRef: ChangeDetectorRef, 
    private signalRService: SignalRService, private ngZone: NgZone) { }

  ngOnInit(): void {
    const now = new Date();
    this.getLocations();
    this.getData();
    // this.signalRService.startConnection();
    // this.hubConnection = this.signalRService.getConnection;
    this.startConnection();
    this.addTransferChartDataListenerIn();
    this.addTransferChartDataListenerOut();
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
    this.cctvService.getCctvCarData(this.selectedLocation, this.currentCamera).subscribe((res:any)=>{
      this.recentVisitors = res;
      this.displayedVisitors = this.recentVisitors?.slice(0, this.itemsPerPage);
      this.spinner.hide();
      if(res==null)
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

  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://accesscontrolbackend.enteract.live/SignalRHub')
      .withAutomaticReconnect()
      .configureLogging(signalR.LogLevel.Information)
      .build();
      
    this.hubConnection
      .start()
      .then(() => {
        
        console.log('ANPR Connection started')
      })
      .catch(err => console.log('Error while starting connection: ' + err))
  }

  public addTransferChartDataListenerIn = () => {
    
    this.hubConnection?.on('SendXmlInData', (response: any) => {
      console.log("Received IN Data: ", response);
      debugger
      // if (response != undefined && response != null) {
      //   this.ngZone.run(() => {
      //     this.recentVisitors.unshift(response[0]);
      //     this.displayedVisitors = this.recentVisitors.slice(0, this.itemsPerPage * this.currentPage);
      //     console.log("logs", this.recentVisitors);
      //     this.changeDetactorRef.detectChanges();
      //   });
      // }
    
      if (response != undefined && response != null) {           
        this.recentVisitors.unshift(response);
        this.displayedVisitors = this.recentVisitors.slice(0, this.itemsPerPage * this.currentPage);
        console.log("Received IN logs",this.recentVisitors)
      }
      this.changeDetactorRef.detectChanges();
    }
    );
  }

  public addTransferChartDataListenerOut = () => {
    
    this.hubConnection?.on('SendXmlOutData', (response: any) => {
      console.log("Received Out Data: ", response);
      debugger
      // if (response != undefined && response != null) {
      //   this.ngZone.run(() => {
      //     this.recentVisitors.unshift(response[0]);
      //     this.displayedVisitors = this.recentVisitors.slice(0, this.itemsPerPage * this.currentPage);
      //     console.log("logs", this.recentVisitors);
      //     this.changeDetactorRef.detectChanges();
      //   });
      // }
      
        if (response != undefined && response != null) {
          this.recentVisitors.unshift(response);
          this.displayedVisitors = this.recentVisitors.slice(0, this.itemsPerPage * this.currentPage);          
         console.log("Received Out logs",this.recentVisitors)
        }
        this.changeDetactorRef.detectChanges();
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
