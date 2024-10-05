import { Component, OnInit } from '@angular/core';

declare var toggleNavPanel:any;
@Component({
  selector: 'app-empty-sidenav',
  templateUrl: './empty-sidenav.component.html',
  styleUrls: ['./empty-sidenav.component.css']
})
export class EmptySidenavComponent implements OnInit {

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
