import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CarsService } from 'src/app/services/carsService/cars.service';
import { DatashareService } from 'src/app/services/datashareservice/datashare.service';


@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css']
})


export class AddCarComponent implements OnInit {

  user: any = {};
  title = "Employee Details"
  activeTabName: string = "";
  error: boolean = false;
  carrierSelector: any;
  flag = true;
  searchText: number = 1;
  emptyform: boolean = true;
  keyFunc(event) {
    this.searchText = event.target.value;
  }

  // vendorDetails = null;
  // visitorDetails = null;



  vendorDetails = {
    status: 200,
    message: "Success",
    errorCode: 0,
    data: {
      vendorid: 285803,
      name: "Waqas",
      email: "umair.khan05@ibex.co",
      current_Designation: "06 - Associate",
      designation_Effective_Date: "",
      joining_Date: "06/07/2022",
      campaign: "",
      mobile: "03347551833",
      cnic: "3530356847196",
      department: "Information Technology",
      location: "Lahore",
      legaEntity: "Virtual World",
      rfid: "11882605",
      team: "Enteract",
      supervisor: "Muhammad Rashid",
      supervisorEmail: "Muhammad.Rashid9@ibex.co",
      lev1_Mgr: "Jamshaid Mustafa",
      lev1_Mgr_Email: "JAMSHAID.MUSTAFA@IBEXGLOBAL.COM",
      lev2_Mgr: "Nadeem Elahi",
      lev2_Mgr_Email: "NADEEM.ELAHI@ibex.co",
      lev3_Mgr: "Nadeem Elahi",
      lev3_Mgr_Email: "NADEEM.ELAHI@ibex.co",
      lev4_Mgr: "Nadeem Elahi",
      lev4_Mgr_Email: "NADEEM.ELAHI@ibex.co",
      lev5_Mgr: "Nadeem Elahi",
      lev5_Mgr_Email: "NADEEM.ELAHI@ibex.co",
      lev6_Mgr: "Nadeem Elahi",
      lev6_Mgr_Email: "NADEEM.ELAHI@ibex.co",
      lev7_Mgr: "Nadeem Elahi",
      lev7_Mgr_Email: "NADEEM.ELAHI@ibex.co",
      lev8_Mgr: "Nadeem Elahi",
      lev8_Mgr_Email: "NADEEM.ELAHI@ibex.co",
      imageUrl: "https://eas.360scrm.com/Images/9b9498c8-54c9-485b-b427-c72fec23ef38_40104464_925795790939077_4046367287463116800_n.jpg",
      showpic: true,
      fingerPrintData: null,
      vehicles: null,
      id: 2228,
      createdDate: null,
      createdBy: null,
      modifiedDate: "2024-05-15T17:42:42.275201",
      modifiedBy: null,
      status: "Active"
    }
  }

  visitorDetails = {
    status: 200,
    message: "Success",
    errorCode: 0,
    data: {
      visitorid: 285804,
      name: "Shahbaz",
      email: "umair.khan05@ibex.co",
      current_Designation: "06 - Associate",
      designation_Effective_Date: "",
      joining_Date: "06/07/2022",
      campaign: "",
      mobile: "03347551833",
      cnic: "3530356847196",
      department: "Information Technology",
      location: "Lahore",
      legaEntity: "Virtual World",
      rfid: "11882605",
      team: "Enteract",
      supervisor: "Muhammad Rashid",
      supervisorEmail: "Muhammad.Rashid9@ibex.co",
      lev1_Mgr: "Jamshaid Mustafa",
      lev1_Mgr_Email: "JAMSHAID.MUSTAFA@IBEXGLOBAL.COM",
      lev2_Mgr: "Nadeem Elahi",
      lev2_Mgr_Email: "NADEEM.ELAHI@ibex.co",
      lev3_Mgr: "Nadeem Elahi",
      lev3_Mgr_Email: "NADEEM.ELAHI@ibex.co",
      lev4_Mgr: "Nadeem Elahi",
      lev4_Mgr_Email: "NADEEM.ELAHI@ibex.co",
      lev5_Mgr: "Nadeem Elahi",
      lev5_Mgr_Email: "NADEEM.ELAHI@ibex.co",
      lev6_Mgr: "Nadeem Elahi",
      lev6_Mgr_Email: "NADEEM.ELAHI@ibex.co",
      lev7_Mgr: "Nadeem Elahi",
      lev7_Mgr_Email: "NADEEM.ELAHI@ibex.co",
      lev8_Mgr: "Nadeem Elahi",
      lev8_Mgr_Email: "NADEEM.ELAHI@ibex.co",
      imageUrl: "https://eas.360scrm.com/Images/9b9498c8-54c9-485b-b427-c72fec23ef38_40104464_925795790939077_4046367287463116800_n.jpg",
      showpic: true,
      fingerPrintData: null,
      vehicles: null,
      id: 2228,
      createdDate: null,
      createdBy: null,
      modifiedDate: "2024-05-15T17:42:42.275201",
      modifiedBy: null,
      status: "Active"
    }
  }

  message: any = {
    title: "Cars",
    Icon: "fal fa-cars",
    subTitle: "Add New Car",
    Url: "/dashboard/cars"
  }

  constructor(private sharedata: DatashareService, private spinner: NgxSpinnerService, private cS: CarsService, private rout: Router,) 
    {
      this.error = true;
      this.activeTabName = 'start';
    }

  ngOnInit(): void {
    this.sharedata.sendMessage(this.message);
  };

  addCarForm = new FormGroup({
    number: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required]),
    make: new FormControl('', [Validators.required]),
    model: new FormControl('', [Validators.required]),
    color: new FormControl('', [Validators.required]),
    brand: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    id: new FormControl('', [Validators.required]),
    mobile: new FormControl('', [ Validators.minLength(11), Validators.maxLength(13)]),
    email: new FormControl('', [ Validators.required , Validators.pattern('^[a-zA-Z0-9._%+-]+@(ibexglobal\\.com|ibex\\.co|Ibex\\.Co|ibex\\.Co|IBEXGLOBAL\\.COM|IBEX\\.CO)$') ]),   
    cnic: new FormControl('', [ Validators.minLength(13), Validators.maxLength(13)]),
    entity: new FormControl('', [Validators.required]),
    department: new FormControl('', [Validators.required]),
    designation: new FormControl('', [Validators.required]),
    reportingManager: new FormControl('', [Validators.required]),
  });

  get vf() {
    return this.addCarForm.controls;
  };


  addCar() {
    const data = {
      "vehicalNo": this.addCarForm.get('number').value,
      "vehicalType": this.addCarForm.get('type').value,
      "makersName": this.addCarForm.get('make').value,
      "model": this.addCarForm.get('model').value,
      "vehicalColor": this.addCarForm.get('color').value,
      "vehicalBrand": this.addCarForm.get('brand').value,
      "carrierSelector": this.carrierSelector,
      "carrierData": {
        "carrierName": this.addCarForm.get('name').value,
        "mobileNo": this.addCarForm.get('mobile').value,
        "emailId": this.addCarForm.get('email').value,
        "cnic": this.addCarForm.get('cnic').value,
        "employeeId": this.addCarForm.get('id').value,
        "entity": this.addCarForm.get('entity').value,
        "department": this.addCarForm.get('department').value,
        "designation": this.addCarForm.get('designation').value,
        "reportingManager": this.addCarForm.get('reportingManager').value,
      }
    };

    this.spinner.show();
    this.cS.addCar(data).subscribe((res) => {
      if (res.status === 200) {
        this.spinner.hide();
        console.log("car added " + res.value)
        this.rout.navigateByUrl('/dashboard/cars');
      }
      else {
        console.log(" Failed to fetch Details ");
      }
    });
  };
  
  getUserDetails() {
    debugger
    console.log( "searched id " + this.searchText);
    this.cS.GetUsers( this.searchText).subscribe((res:any)=>{
      this.user = res?.data?.userDetails;
      if (this.user !== null && this.searchText == this.user?.employeeID) {
        this.emptyform = false;
        this.addCarForm.get('name').setValue(this.user?.employeeName);
        this.addCarForm.get('id').setValue(this.user?.employeeID);
        this.addCarForm.get('mobile').setValue(this.user?.employeeMobileNumber);
        this.addCarForm.get('email').setValue(this.user?.employeeEmail);
        this.addCarForm.get('cnic').setValue(this.user?.employeeCNIC);
        this.addCarForm.get('entity').setValue(this.user?.employeeEntityName);
        this.addCarForm.get('department').setValue(this.user?.employeeDepartment);
        this.addCarForm.get('designation').setValue(this.user?.employeeDesignation);
        this.addCarForm.get('reportingManager').setValue(this.user?.reportingManager);
      }
    else {
      this.emptyform = true;
      this.resetform();
    }
      console.log(res?.data?.userDetails);
    });
  }


  setNoRecord() {
    this.searchText = 1;
    this.error = true;
    this.activeTabName = 'start';
    this.resetform();
  };

  resetform(){
    this.addCarForm.get('name').setValue("");
    this.addCarForm.get('id').setValue("");
    this.addCarForm.get('mobile').setValue("");
    this.addCarForm.get('email').setValue("");
    this.addCarForm.get('cnic').setValue("");
    this.addCarForm.get('entity').setValue("");
    this.addCarForm.get('department').setValue("");
    this.addCarForm.get('designation').setValue("");
    this.addCarForm.get('reportingManager').setValue("");
  }

  activeTab(tabName: string) {

    if (tabName === 'Employee') {
      this.emptyform = true;
      this.error = false;
      this.title = 'Employee Details';
      this.carrierSelector = "Employee"
      this.resetform();
      debugger
      if ( this.searchText !== 1 ){
        this.getUserDetails();
        if (this.user !== null && this.searchText == this.user?.employeeID) {
          this.emptyform = false;
          this.addCarForm.get('name').setValue(this.user?.employeeName);
          this.addCarForm.get('id').setValue(this.user?.employeeID);
          this.addCarForm.get('mobile').setValue(this.user?.employeeMobileNumber);
          this.addCarForm.get('email').setValue(this.user?.employeeEmail);
          this.addCarForm.get('cnic').setValue(this.user?.employeeCNIC);
          this.addCarForm.get('entity').setValue(this.user?.employeeEntityName);
          this.addCarForm.get('department').setValue(this.user?.employeeDepartment);
          this.addCarForm.get('designation').setValue(this.user?.employeeDesignation);
          this.addCarForm.get('reportingManager').setValue(this.user?.reportingManager);
        }

      }
    }
    else if (tabName === 'Vendor') {
      this.emptyform = true;
      this.error = false;
      this.title = 'Vendor Details';
      this.carrierSelector = "Vendor"
      this.resetform();
      if (this.vendorDetails !== null && this.searchText == this.vendorDetails.data.vendorid) {
        this.emptyform = false;
        this.addCarForm.get('name').setValue(this.vendorDetails.data.name);
        this.addCarForm.get('id').setValue(this.vendorDetails.data.vendorid);
        this.addCarForm.get('mobile').setValue(this.vendorDetails.data.mobile);
        this.addCarForm.get('email').setValue(this.vendorDetails.data.email);
        this.addCarForm.get('cnic').setValue(this.vendorDetails.data.cnic);
        this.addCarForm.get('entity').setValue(this.vendorDetails.data.legaEntity);
        this.addCarForm.get('department').setValue(this.vendorDetails.data.department);
        this.addCarForm.get('designation').setValue(this.vendorDetails.data.current_Designation);
        this.addCarForm.get('reportingManager').setValue(this.vendorDetails.data.supervisor);
      }
      // this.spinner.hide();
    }
    else if (tabName === 'Visitor') {
      this.emptyform = true;
      this.error = false;
      this.title = 'Visitor Details';
      this.carrierSelector = "Visitor"
      this.resetform();
      if (this.visitorDetails !== null && this.searchText == this.visitorDetails.data.visitorid) {
        this.emptyform = false;
        this.addCarForm.get('name').setValue(this.visitorDetails.data.name);
        this.addCarForm.get('id').setValue(this.visitorDetails.data.visitorid);
        this.addCarForm.get('mobile').setValue(this.visitorDetails.data.mobile);
        this.addCarForm.get('email').setValue(this.visitorDetails.data.email);
        this.addCarForm.get('cnic').setValue(this.visitorDetails.data.cnic);
        this.addCarForm.get('entity').setValue(this.visitorDetails.data.legaEntity);
        this.addCarForm.get('department').setValue(this.visitorDetails.data.department);
        this.addCarForm.get('designation').setValue(this.visitorDetails.data.current_Designation);
        this.addCarForm.get('reportingManager').setValue(this.visitorDetails.data.supervisor);
      }
    }
    else {
      this.setNoRecord();
    }
    this.activeTabName = tabName;
  };


  submit() {
    if (this.addCarForm.valid) {
      this.addCar();
    }
    else {
      this.markFormGroupTouched(this.addCarForm);
    }
    console.log(this.addCarForm.value)
  }

  private markFormGroupTouched(formGroup: FormGroup | FormArray) {
    Object.values(formGroup.controls).forEach(control => {
      if (control instanceof FormGroup || control instanceof FormArray) {
        this.markFormGroupTouched(control);
      } else {
        control.markAsTouched();
      }
    });
    this.flag = false;
  }


}
