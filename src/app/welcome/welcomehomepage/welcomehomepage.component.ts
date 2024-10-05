import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WelcomeService } from 'src/app/services/welcome.service';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-welcomehomepage',
  templateUrl: './welcomehomepage.component.html',
  styleUrls: ['./welcomehomepage.component.css']
})
export class WelcomehomepageComponent implements OnInit {
data=[{
  title:"IBEX1",
  image:'../../assets/Images/building1.png'
},
{
  title:"IBEX2",
  image:'../../assets/Images/building2.png'
},{
  title:"IBEX3",
  image:'../../assets/Images/building1.png'
}]
  constructor(private welcomeService:WelcomeService,private router:Router,
    private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
  }
  redirectToRecentVisitors(title){
    console.log("Recent Visitors",title)
    // spinner to inform the user that data loading is in progress
    this.spinner.show();
    this.welcomeService.logsByBuilding(title).subscribe((res:any)=>{
      console.log("Redirecting to",res)
      if(res.status==200){
        this.spinner.hide();
this.router.navigateByUrl('/recent-visitors')
      }
      else{
        alert(res.message)
      }
    })
  }
}
