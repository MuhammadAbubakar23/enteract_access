import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DeviceService } from 'src/app/services/deviceservice/device.service';
import { SidenavServiceService } from 'src/app/services/sidenavService/sidenav-service.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  route: string;
  isActiveDashboards = false;
  isActiveDevice = false;
  isActiveUsers = false;
  isActiveLocations = false;
  isActivePermissions = false;
  isActivatedCars = false;
  isActiveLogs = false;
  isActiveCard=false;

  constructor(private sidenavService: SidenavServiceService, private router: Router, private deviceService: DeviceService) { }

  ngOnInit(): void {
    this.route = this.router.url.split('/')[2];
    this.updatevalue(this.route);
  }
//   isAdminLoggedIn(): boolean {
//     const loggedInUser = localStorage.getItem("username");
//     console.log("username===>",loggedInUser)
//     return loggedInUser.includes("Admin");
//  }

clearDeviceFilters(){
  this.deviceService.filter.make = '';
  this.deviceService.filter.type = '';
  this.deviceService.filter.status = '';
  this.deviceService.filter.search = '';
}
 isHRLoggedIn(): boolean {
  const loggedInUser = localStorage.getItem("username");
  return loggedInUser.includes("hr");
}
  updatevalue(string:any){
    

    this.sidenavService.updateMessage(string);

    this.isActiveDashboards = false;
    this.isActiveDevice = false;
    this.isActiveUsers = false;
    this.isActiveLocations = false;
    this.isActivePermissions = false;
    this.isActivatedCars = false;
    this.isActiveLogs = false;
    this.isActiveCard=false;

    switch(string){
      case 'dashboards':
        this.isActiveDashboards = true;
        break;

      case 'devicemanagement':
        this.isActiveDevice = true;
        break;

      case 'cardmanagement':
        this.isActiveCard=true;
        this.clearDeviceFilters();
        break;

      case 'listofusers':
      case 'listofteams':
      case 'listofgroups':
        this.isActiveUsers = true;
        this.clearDeviceFilters();
        break;

      case 'listoflocations':
      case 'listofaccesspoints':
        this.isActiveLocations = true;
        this.clearDeviceFilters();
        break;
      
      case 'listofpermissions':
        this.isActivePermissions = true;
        this.clearDeviceFilters();
        break;

      case 'cars':
        this.isActivatedCars = true;
        break;

      case 'logs':
        this.isActiveLogs = true;
        this.clearDeviceFilters();
        break;
    }
  }

  public routerLinkVariable = '/dashboard/devicemanagement/listofdevices'

}

