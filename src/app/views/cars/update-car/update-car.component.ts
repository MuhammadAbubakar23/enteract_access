import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CarsService } from 'src/app/services/carsService/cars.service';
import { DatashareService } from 'src/app/services/datashareservice/datashare.service';

@Component({
  selector: 'app-update-car',
  templateUrl: './update-car.component.html',
  styleUrls: ['./update-car.component.css']
})
export class UpdateCarComponent implements OnInit {
  details: any;
  carData: any;
  message: any = {
    title: "Cars",
    Icon: "fal fa-cars",
    subTitle: "Update Car Details",
    Url: "/dashboard/cars"
  }
  title = "Employee Details"
  activeTabName: string = "";
  error: boolean = false;
  carrierSelector: string = "Visitor";
  currentId: number;
  searchText: number = 1;
  ownerDetails: any;

  keyFunc(event) {
    this.searchText = event.target.value;
  }

  constructor(private sharedata: DatashareService, private spinner: NgxSpinnerService, private rout: Router,
    private cS: CarsService, private aR: ActivatedRoute) {
    this.error = true;
    this.activeTabName = 'start';
  }

  ngOnInit(): void {
    this.aR.params.subscribe((params) => {
      console.log("recived parameter from link = " + params);
      this.currentId = params['id'];
      console.log("recived id from link param = " + this.currentId);
    })

    this.sharedata.sendMessage(this.message);
    this.getDetails();
  };

  getDetails() {
    this.spinner.show();
    this.cS.getCarDetails(this.currentId).subscribe((res) => {
      
      if (res.status === 200) {
        this.spinner.hide();
        this.carData = res.data[0].vehicalDetails;
        this.carrierSelector = this.carData.carrierType;
        this.ownerDetails = res.data[0].ownerDetails;
        this.activeTab(this.carrierSelector);
        console.log("obtained Details = " + res);
      }
      else {
        console.log(" Failed to fetch Details ");
      }
    })
  }

  updateCarForm = new FormGroup({
    number: new FormControl(''),
    type: new FormControl(''),
    make: new FormControl(''),
    model: new FormControl(''),
    color: new FormControl(''),
    brand: new FormControl(''),
    name: new FormControl(''),
    id: new FormControl(''),
    mobile: new FormControl(''),
    email: new FormControl(''),
    cnic: new FormControl(''),
    entity: new FormControl(''),
    department: new FormControl(''),
    designation: new FormControl(''),
    reportingManager: new FormControl(''),
  });
  
  // updateCarForm = new FormGroup({
  //   number: new FormControl('', [Validators.required]),
  //   type: new FormControl('', [Validators.required]),
  //   make: new FormControl('', [Validators.required]),
  //   model: new FormControl('', [Validators.required]),
  //   color: new FormControl('', [Validators.required]),
  //   brand: new FormControl('', [Validators.required]),
  //   name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
  //   id: new FormControl('', [Validators.required]),
  //   mobile: new FormControl('', [ Validators.minLength(11), Validators.maxLength(13)]),
  //   email: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@ibex\.co$')]),
  //   cnic: new FormControl('', [ Validators.minLength(13), Validators.maxLength(13)]),
  //   entity: new FormControl('', [Validators.required]),
  //   department: new FormControl('', [Validators.required]),
  //   designation: new FormControl('', [Validators.required]),
  //   reportingManager: new FormControl('', [Validators.required]),
  // });

  get vf() {
    return this.updateCarForm.controls;
  };


  updateCar() {
    const data = {
      "id": this.currentId,
      "vehicalNo": this.updateCarForm.get('number').value,
      "vehicalType": this.updateCarForm.get('type').value,
      "makersName": this.updateCarForm.get('make').value,
      "model": this.updateCarForm.get('model').value,
      "vehicalColor": this.updateCarForm.get('color').value,
      "vehicalBrand": this.updateCarForm.get('brand').value,
      "carrierSelector": this.carrierSelector,
      "carrierId": "3330338319961",
      "isActive": true,
      "isBlock": false,
      "carrierData": {
        "id": this.currentId,
        "status": "",
        "carrierName": this.updateCarForm.get('name').value,
        "mobileNo": this.updateCarForm.get('mobile').value,
        "emailId": this.updateCarForm.get('email').value,
        "cnic": this.updateCarForm.get('cnic').value,
        "employeeId": this.updateCarForm.get('id').value,
        "entity": this.updateCarForm.get('entity').value,
        "department": this.updateCarForm.get('department').value,
        "designation": this.updateCarForm.get('designation').value,
        "reportingManager": this.updateCarForm.get('reportingManager').value,
        "isActive": true,
        "isBlock": false

      }
    };

    this.spinner.show();
    this.cS.updateCarDetails(data).subscribe((res) => {
      
      if (res.status === 200) {
        this.spinner.hide();
        console.log("car updated " + res.value)
        this.rout.navigateByUrl('/dashboard/cars');
      }
      else {
        console.log(" Failed to Upload Details ");
      }
    })
  };

  set(){
    this.updateCarForm.get('name').setValue(this.ownerDetails.carrierName);
    this.updateCarForm.get('id').setValue(this.ownerDetails.employeeId);
    this.updateCarForm.get('mobile').setValue(this.ownerDetails.mobileNo);
    this.updateCarForm.get('email').setValue(this.ownerDetails.emailId);
    this.updateCarForm.get('cnic').setValue(this.ownerDetails.cnic);
    this.updateCarForm.get('entity').setValue(this.ownerDetails.entity);
    this.updateCarForm.get('department').setValue(this.ownerDetails.department);
    this.updateCarForm.get('designation').setValue(this.ownerDetails.designation);
    this.updateCarForm.get('reportingManager').setValue(this.ownerDetails.reportingManager);
  }

  unSet(){
    this.updateCarForm.get('name').setValue('');
    this.updateCarForm.get('id').setValue('');
    this.updateCarForm.get('mobile').setValue('');
    this.updateCarForm.get('email').setValue('');
    this.updateCarForm.get('cnic').setValue('');
    this.updateCarForm.get('entity').setValue('');
    this.updateCarForm.get('department').setValue('');
    this.updateCarForm.get('designation').setValue('');
    this.updateCarForm.get('reportingManager').setValue('');
  }



  activeTab(tabName: string) {

    if (tabName === 'Employee') {
      this.title = 'Employee Details';
      this.updateCarForm.reset();
      this.updateCarForm.get('number').setValue(this.carData?.vehicalNo);
      this.updateCarForm.get('type').setValue(this.carData?.vehicalType);
      this.updateCarForm.get('make').setValue(this.carData?.makersName);
      this.updateCarForm.get('model').setValue(this.carData?.model);
      this.updateCarForm.get('color').setValue(this.carData?.vehicalColor);
      this.updateCarForm.get('brand').setValue(this.carData?.vehicalBrand);

      if (this.carrierSelector === 'Employee') {
        this.error = false;
        this.set();
      }
      else if (this.ownerDetails !== null && this.searchText == this.ownerDetails.employeeId) {
        this.set();
      }
      else if (this.ownerDetails !== null && this.searchText !== this.ownerDetails.employeeId) {
        this.unSet();
      }
    }
    else if (tabName === 'Vendor') {
      this.title = 'Vendor Details';
      this.updateCarForm.reset();
      this.updateCarForm.get('number').setValue(this.carData?.vehicalNo);
      this.updateCarForm.get('type').setValue(this.carData?.vehicalType);
      this.updateCarForm.get('make').setValue(this.carData?.makersName);
      this.updateCarForm.get('model').setValue(this.carData?.model);
      this.updateCarForm.get('color').setValue(this.carData?.vehicalColor);
      this.updateCarForm.get('brand').setValue(this.carData?.vehicalBrand);

      if (this.carrierSelector === 'Vendor') {
        this.error = false;
        this.set();
      }
      else if (this.ownerDetails !== null && this.searchText == this.ownerDetails.employeeId) {
        this.set();
      }
      else if (this.ownerDetails !== null && this.searchText !== this.ownerDetails.vendorid) {
        this.unSet();
      }
    }
    else if (tabName === 'Visitor') {
      this.title = 'Visitor Details';
      this.updateCarForm.reset();
      this.updateCarForm.get('number').setValue(this.carData?.vehicalNo);
      this.updateCarForm.get('type').setValue(this.carData?.vehicalType);
      this.updateCarForm.get('make').setValue(this.carData?.makersName);
      this.updateCarForm.get('model').setValue(this.carData?.model);
      this.updateCarForm.get('color').setValue(this.carData?.vehicalColor);
      this.updateCarForm.get('brand').setValue(this.carData?.vehicalBrand);

      if (this.carrierSelector === 'Visitor') {
        this.error = false;
        this.set();
      }
      else if (this.ownerDetails !== null && this.searchText == this.ownerDetails.employeeId) {
        this.set();
      }
      else if (this.ownerDetails === null && this.searchText !== this.ownerDetails.employeeId) {
        this.unSet();
      }
    }

    this.activeTabName = tabName;
  };

  submit() {
    this.updateCar();
    console.log(this.updateCarForm.value)
  }

}
