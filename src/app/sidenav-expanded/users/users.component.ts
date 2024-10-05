import { AfterContentInit, Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { DatashareService } from 'src/app/services/datashareservice/datashare.service';
import { SidenavServiceService } from 'src/app/services/sidenavService/sidenav-service.service';

declare var toggleNavPanel: any;
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  header = {
    title: "Users & Teams",
    Icon: "",
    subTitle: "",
    Url: "/dashboard/listofusers", //url is yet to be given for the respective component yet to be made fal fa-home
  }
  message: any[] = [
    {
      title: "Users",
      Icon: "fal fa-users pe-2",
      subTitle: "",
      Url: "/dashboard/listofusers",
    },

    {
      title: "Teams",
      Icon: "fal fa-users-class pe-2",
      subTitle: "",
      Url: "/dashboard/listofteams",
    },

    {
      title: "Groups",
      Icon: "fa-light fa-people-group pe-2",
      subTitle: "",
      Url: "/dashboard/listofgroups",
    },

  ]

  constructor(private dataShare: DatashareService, private sidenavService:
    SidenavServiceService, private rout: Router) { }

  ngOnInit(): void {
    this.rout.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (event.urlAfterRedirects.includes('/dashboard/listofusers/userdetail/')) {
          const navElement = document.getElementById('left-sidebar-expand');
          if (navElement && !navElement.classList.contains('toggled')) {
            navElement.classList.add('toggled');
          }
        } else { }
      }
    });
  }
    


  toggle() {
    ;
  }

  toggleNavTest() {
    toggleNavPanel();
  }
}
