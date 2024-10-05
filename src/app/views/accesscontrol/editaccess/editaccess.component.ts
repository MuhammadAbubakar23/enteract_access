import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-editaccess',
  templateUrl: './editaccess.component.html',
  styleUrls: ['./editaccess.component.css']
})
export class EditaccessComponent implements OnInit {

  constructor(private spinner: NgxSpinnerService,) { 
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 4000);
  }

  ngOnInit(): void {
  }

}
