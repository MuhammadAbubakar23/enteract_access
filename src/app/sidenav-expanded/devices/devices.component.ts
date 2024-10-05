import { Component, OnInit } from '@angular/core';
import { DatashareService } from 'src/app/services/datashareservice/datashare.service';

declare var toggleNavPanel:any;
@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})
export class DevicesComponent implements OnInit {

  // customVal:string[]=[];
  // constructor(private dataShare:DatashareService) { }

  ngOnInit(): void {
    // this.dataShare.getMessage().subscribe(res=>{
    //   this.customVal=res;
    //   console.log(res);

    // });
  }

  toggle(){
    ;
  }

  toggleNavTest(){
    toggleNavPanel();
  }
}
