import { AfterContentInit, Component, OnInit } from '@angular/core';
import { DatashareService } from 'src/app/services/datashareservice/datashare.service';

declare var toggleNavPanel:any;

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent implements OnInit, AfterContentInit {

  

  customVal:string[]=[];
  constructor(private dataShare:DatashareService) { }
  
  ngAfterContentInit(): void {
   // this.customVal=["Locations","","Locations","Access Points","/dashboard/listoflocations","/dashboard/listofaccesspoints","fal fa-map-marker-alt","fal fa-badge-check","fal fa-map-marker-alt","/dashboard/listoflocations"];

  }

  ngOnInit(): void {
    this.customVal=["Locations","","Locations","Access Points","/dashboard/listoflocations","/dashboard/listofaccesspoints","fal fa-map-marker-alt","fal fa-badge-check","fal fa-map-marker-alt","/dashboard/listoflocations"];


  }


  toggleNavTest(){
    toggleNavPanel();
  }
}
