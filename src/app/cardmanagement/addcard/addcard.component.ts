import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-addcard',
  templateUrl: './addcard.component.html',
  styleUrls: ['./addcard.component.css']
})
export class AddcardComponent implements OnInit {
  mode = 'create';
  // message: string[] = ["Access Cards", "Add Card", "", "", "", "", "", "", "fa-light fa-address-card", "cardmanagement/listofcards", "cardmanagement/addcard", "breadcrumb-item active"]

  message : any = {
    title: "Access Cards",
    Icon: "fa-light fa-address-card",
    subTitle: "Add Card",
    Url: "cardmanagement/listofcards"
  }

  constructor(private spinner: NgxSpinnerService,) {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
   }

  ngOnInit(): void {
  }

}
