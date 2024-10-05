import { Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DatashareService } from 'src/app/services/datashareservice/datashare.service';
import { SidenavServiceService } from 'src/app/services/sidenavService/sidenav-service.service';
import { DashboardsComponent } from 'src/app/sidenav-expanded/dashboards/dashboards.component';
import { DevicesComponent } from 'src/app/sidenav-expanded/devices/devices.component';
import { EmptySidenavComponent } from 'src/app/sidenav-expanded/empty-sidenav/empty-sidenav.component';
import { LocationsComponent } from 'src/app/sidenav-expanded/locations/locations.component';
import { UsersComponent } from 'src/app/sidenav-expanded/users/users.component';
declare var goahead: any;

declare var toggleNavPanel: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  public subscription!: Subscription;

  test: any;
  customVal: string[] = [];

  @ViewChild('container', {
    read: ViewContainerRef
  }) target!: ViewContainerRef;

  componentName!: string;


  constructor(private dataShare: DatashareService,
    private router: Router,
    private resolver: ComponentFactoryResolver,
    private sidenavService: SidenavServiceService, private rout: Router) {  }


  ngOnInit(): void {
    this.dataShare.getMessage().subscribe(res => {
      this.customVal = res;
      console.log(res);

    });

    this.subscription = this.sidenavService.getMessage().subscribe(msg => {

      
      this.componentName = msg;

      this.target?.clear();
      this.loadComponent(this.componentName);

    });
    // this.setActive();
  }

  toggle() {
    ;
  }

  toggleNavTest() {
    toggleNavPanel();
  }

  setActive() {
    
    const currentUrl = this.rout.url.split('/');
    // this.currentUrl = currentUrl.split( '/' );   
    // currentUrl.includes('listofusers') 
    // currentUrl.match(/masteringjs/) != null;  
    // currentUrl.indexOf('masteringjs.io') !== -1;
    if (currentUrl[2] === 'listofusers') {
      this.test = 'listofusers';
      this.sidenavService.updateMessage(this.test);
    }
  }

  ngAfterViewInit() {
    
    this.target.clear();
    this.loadComponent(this.componentName);
  }

  loadComponent(leftSideName: string) {

    

    let componentFactory = null;

    switch (leftSideName) {
      case 'dashboards':
        componentFactory = this.resolver.resolveComponentFactory(DashboardsComponent);
        let componentRef0= this.target?.createComponent<DashboardsComponent>(componentFactory);
        break;
      case ('devicemanagement'):
        
        componentFactory = this.resolver.resolveComponentFactory(DevicesComponent);
        let componentRef1 = this.target?.createComponent<DevicesComponent>(componentFactory);
        // componentRef1.instance.customVal.push("devicemanagement");
        // componentRef1.instance.customVal.push("devicemanagement2");
        // componentRef1.instance.customVal.push("devicemanagement3");
        // componentRef1.instance.customVal.push("devicemanagement4");
        break;
        
      case 'listofteams':
      case 'listofgroups':
      case ('listofusers'):
        componentFactory = this.resolver.resolveComponentFactory(UsersComponent);
        let componentRef2 = this.target?.createComponent<UsersComponent>(componentFactory);

        break;
      case ('listofaccesspoints'):
      case ('listoflocations'):
        componentFactory = this.resolver.resolveComponentFactory(LocationsComponent);
        let componentRef4 = this.target?.createComponent<LocationsComponent>(componentFactory);

        break;

      case ('listofpermissions'):
        componentFactory = this.resolver.resolveComponentFactory(EmptySidenavComponent);
        let componentRef5 = this.target.createComponent<EmptySidenavComponent>(componentFactory);

        break;

      case ('cars'):
        componentFactory = this.resolver.resolveComponentFactory(EmptySidenavComponent);
        let componentRe7 = this.target?.createComponent<EmptySidenavComponent>(componentFactory);

        break;

      case ('logs'):
        componentFactory = this.resolver.resolveComponentFactory(EmptySidenavComponent);
        let componentRef6 = this.target?.createComponent<EmptySidenavComponent>(componentFactory);

        break;



      default:

        componentFactory = this.resolver.resolveComponentFactory(DevicesComponent);
        let componentRef3 = this.target?.createComponent<DevicesComponent>(componentFactory);
        // this.href = this.router.url;

        break;
    }
  }
}
function EmptySideNavComponent(EmptySideNavComponent: any): any {
  throw new Error('Function not implemented.');
}

