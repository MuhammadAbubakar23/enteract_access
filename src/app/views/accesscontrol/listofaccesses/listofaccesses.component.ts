import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-listofaccesses',
  templateUrl: './listofaccesses.component.html',
  styleUrls: ['./listofaccesses.component.css']
})
export class ListofaccessesComponent implements OnInit {

  constructor(private spinner: NgxSpinnerService,) { 
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 4000);
  }

  ngOnInit(): void {
  }

}
