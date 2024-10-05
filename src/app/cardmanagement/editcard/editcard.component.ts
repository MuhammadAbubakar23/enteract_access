// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-editcard',
//   templateUrl: './editcard.component.html',
//   styleUrls: ['./editcard.component.css']
// })
// export class EditcardComponent implements OnInit {
//   mode="update"
//   message: string[] = ["Access Cards", "Edit Card", "", "", "", "", "", "", "fa-light fa-address-card", "cardmanagement/listofcards", "cardmanagement/editcard", "breadcrumb-item active"]
//   constructor() { }

//   ngOnInit(): void {
//   }

// }
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Card } from 'src/app/layouts/shared/models/CardDto';
import { CardService } from 'src/app/services/CardService/card.service';
import { DatashareService } from 'src/app/services/datashareservice/datashare.service';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { map, Observable, startWith } from 'rxjs';
import { ENTER, COMMA } from '@angular/cdk/keycodes';

import { ChangeDetectorRef } from '@angular/core';
import { MachineService } from 'src/app/services/machineuserservice/machine.service';
import { NgxSpinnerService } from 'ngx-spinner';
interface ImageUploadResponse {
  statusCode: number;
  message: string;
  error?: string;
  birthday: string

}  

@Component({
    selector: 'app-editcard',
  templateUrl: './editcard.component.html',
  styleUrls: ['./editcard.component.css']
})

export class EditcardComponent implements OnInit {
  mode="update"
  // message: string[] = ["Access Cards", "Edit Card", "", "", "", "", "", "", "fa-light fa-address-card", "cardmanagement/listofcards", "cardmanagement/editcard", "breadcrumb-item active"]
    message : any = {
    title: "Access Cards",
    Icon: "fa-light fa-address-card",
    subTitle: "Edit Card",
    Url: "cardmanagement/listofcards"
  }
  isHRLoggedIn(): boolean {
    const loggedInUser = localStorage.getItem("username");
    return loggedInUser.includes("hr");
  }
  

  // @Input() mode = ""
  // @Input() message = []
  card: Card = new Card()
  cities = []
  separatorKeysCodes: number[] = [ENTER, COMMA];
  locations = [];
  fruits: string[] = ['Lemon'];
  allLocation: string[] = ['Ibex1', 'Ibex2', 'Ibex3'];
  machines = []
  defaultDate = new Date();
  auth: boolean = false;
  locationCtrl = new FormControl('');
  devices: any[] = [];
  data: any;
  form: any;
  Data:any
  getdata:any[]=[];
  filteredlocations: Observable<string[]>;
   cardId:number
  cardForm = new FormGroup(
    {
      City: new FormControl(this.card.city,),
      Location: new FormControl(this.card.location ,[Validators.required]),
      Machine: new FormControl(this.card.machine,[Validators.required]),
      CardNumber: new FormControl(this.card.cardnumber, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      EmployeeNumber: new FormControl(this.card.employeenumber,[Validators.required]),
      EmployeeName: new FormControl(this.card.employeename,[Validators.required]),
      Username: new FormControl(this.card.username),
      Password: new FormControl(this.card.password),
      Port: new FormControl(this.card.port),
      ExpiryDate: new FormControl(this.card.expirydate )
    }
  )
  constructor(
    private cardService: CardService,
    private toaster: ToastrService,
    private router: Router,
    private dataShare: DatashareService,
    private http: HttpClient,
    private route:ActivatedRoute,
    private cd:ChangeDetectorRef,
    private machineUserService: MachineService,
    public toastr: ToastrService, private spinner: NgxSpinnerService,
  ) {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
    this.filteredlocations = this.locationCtrl.valueChanges.pipe(
      startWith(null),
      map((location: string | null) => (location ? this._filter(location) : this.allLocation.slice())),

    )
  };





cityId:number
  selectedLocationId: number[];
  selectedDevicesId:number[]
  selectedCity: number 
  ngOnInit(): void {
     this.dataShare.sendMessage(this.message);
  

var Id = this.route.snapshot.paramMap.get('id');
var cardId = Number(Id);
console.log("Edit cardId", cardId);


   this.cardService.editcard(cardId).subscribe((res: any) => {
  
  this.selectedCity=res.cityId;
  this.selectedLocationId=res.locationIds;
  this.selectedDevicesId=res.deviceIds
  this.url = res.imageUrl

  console.log("ress++++>",res);

  // const devices=res.devices
  // for(let dev of devices){
  //   console.log(dev)
  // }
 
  

  
this.cardForm.patchValue({
   City: res.cityId,
  CardNumber: res.cardNumber,
  EmployeeNumber:res.employeenNumber,
  EmployeeName:res.employeeName,
  ExpiryDate: res.expiryDate,
  // deviceIds:dev


   
  
});

const cityId=this.selectedCity

   this.cardService.getDevicesByLocation(cityId).subscribe((res: any) => {
    this.locations =res.data
    
    console.log("locations=====>",res.data);



    // get devices
    
    const locationId=this.selectedLocationId
    this.cardService.getdevices(locationId).subscribe(
      (response:any) => {
        console.warn("data====@@@=>of mechine",response.data);
      
        this.data = response.data;
      },)


  });
  


  
}); 





}
//Image uploading/////////////////////////////////////////////////////////////////
file: File;
url: any;
  msg = "";

  onFileChanged(event: any) {
    
    this.file = event.target.files[0];

    if (!event.target.files[0] || event.target.files[0].length == 0) {
      this.msg = 'You must select an image';
      return;
    }

    var mimeType = event.target.files[0].type;

    if (mimeType.match(/image\/*/) == null) {
      this.msg = "Only images are supported";
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

    reader.onload = (_event) => {
      this.msg = "";
      this.url = reader.result;
    }
  }
  newFile() {
    
    var uploadData: FormData = new FormData();
    uploadData.append('Employee_Id', this.cardForm.value.EmployeeNumber);
    uploadData.append('file', this.file);
    // uploadData.append('Employee_Id', this.emplId);
    // uploadData.append('file', this.file);
    // uploadData.append('password', this.password);
    console.log(uploadData)
    this.machineUserService.imageUploadFaceDetection(uploadData).subscribe(
      (response: ImageUploadResponse) => {  
        console.log(response);
        if (response.statusCode === 200) {
          this.toastr.success("Image is uploaded Successfully", "Success");
        } else {
          // this.toastr.error(response.error, "Error");
        }
      },
      error => {
        console.log(error);
        this.toastr.error("Something went wrong", "Error");
      }
    );   
  }
///////////////////////////////////////////////////////////////////////////////////
 
isDevicesSelected(deviceId:number):boolean{


  if(this.selectedDevicesId!==undefined){
    return this.selectedDevicesId.includes(deviceId)
  }

  else{
 return false;
  }
 
}






  onChangeLocation(event: any) {

    alert(event.option.value.name);
    this.add(event.option.value.name)
  }

  onChange(event: any) {
    
  //  const data=this.selectedCity
  // var cityId=this.selectedCity
    const  cityId=event.target.value

    
    this.cardService.getDevicesByLocation(cityId).subscribe((res: any) => {
     this.locations =res.data
     
     console.log("locations====++++=>",res.data);

 
   });

    // this.getDevices()

  }





  authenticate() {
    if (this.mode === "create") {
      localStorage.setItem("deviceId", this.cardForm.value.Machine)
      this.devices.find((device: any) => {
        if (this.cardForm.value.Machine == device.ip) {
          this.cardForm.patchValue({
            Username: device.userName,
            Password: device.password,
            Port: device.port
          })
        }
      })
      let data = {
        ipAddress: this.cardForm.value.Machine,
        username: this.cardForm.value.Username,
        port: this.cardForm.value.Port,
        password: this.cardForm.value.Password
      }
      console.log("data===>", data)
      this.cardService.loginToDevice(data).subscribe((res: any) => {
        console.log("authentice response", res)
        if (res.status == 200) {
          this.toaster.success("Successfully Login", "Success")
          this.auth = true;
        }
        else {
          this.toaster.error(res.message, "Error")
        }

      }, (error: any) => {
        this.toaster.error("something went wrong", "Error")
      })
    }
  }





  submitform() {
 

    if (this.mode === "create") {
      this.devices.find((device) => {
        if (this.cardForm.value.Machine == device.ip) {
          this.cardForm.value.Machine = device.id
        }
      })
      localStorage.setItem("deviceId", this.cardForm.value.Machine)
      
      let data = {
        deviceIds:this.machines,
        cardNumber: this.cardForm.value.CardNumber,
        employeenNumber: this.cardForm.value.EmployeeNumber,
        employeeName: this.cardForm.value.EmployeeName,
        expiryDate : this.cardForm.value.ExpiryDate, 
        isAddedToDevice: false,
        error: ""
      }
      if(data.deviceIds.length===0){
        this.toaster.error('Please Add the devices',"Error")
      }

      this.cardService.addCard(data) . subscribe((res: any) => {
 
        
        console.warn("success==@@@>", res);
        
       
        if (res.status === 200) {
          this.newFile();
          this.router.navigateByUrl("/dashboard/cardmanagement/listofcards")
          this.toaster.success("Card Added Successfully", "Success")
        }
      //    if(res.machines.length===0){
      //   this.toaster.warning("add fast")
      // }

        else {
          // this.router.navigateByUrl("/dashboard/cardmanagement/listofcards")
          this.toaster.error(res.message, "Error")
        }

      }, (error: any) => {
        this.toaster.error("something went wrong", "Error")
      })
    }

    // updata data 

   if (this.mode === "update") {
    

  let data = {
  
   
      City: this.cardForm.value.City,
      CardNumber: this.cardForm.value.CardNumber,
      id:Number (this.route.snapshot.paramMap.get('id')),
      deviceIds: this.selectedDevicesId,
      EmployeenNumber: this.cardForm.value.EmployeeNumber,
      EmployeeName: this.cardForm.value.EmployeeName,
      ExpiryDate: this.cardForm.value.ExpiryDate,
      isAddedToDevice: false,
      error: "",
      ImageUrl: this.url
   

  };
  

  this.cardService.updataCard(data).subscribe(
    (res: any) => {
      console.log("success=@@#$#@=>", res);
      if (res.status === 200) {
        this.newFile();
        this.router.navigateByUrl("/dashboard/cardmanagement/listofcards");
        this.toaster.success("Card Updated Successfully", "Success");
      } else {
        this.toaster.error(res.message, "Error");
      }
    },
    (error: any) => {
      this.toaster.error("Something went wrong", "Error");
    }
  );
}

   

  }


  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;




  remove(location: string): void {
    const index = this.locations.indexOf(location);

    if (index >= 0) {
      this.locations.splice(index, 1);
    }
  }


  add(event: MatChipInputEvent): void {
    

    // const value = (event.value || '').trim();
     const value = event;

    if (value) {
      this.locations.push(value);
      console.log(value);
      console.log('added')


    }

    // Clear the input value
    event.chipInput!.clear();

    this.locationCtrl.setValue(null);



  }


  selected(event: MatAutocompleteSelectedEvent): void {

    
    this.locations.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.locationCtrl.setValue(null);

  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allLocation.filter(location => location.toLowerCase().includes(filterValue));
  }

  selectedItems: any[] = [];



  selectedValues(value: string) {
    

    if (this.selectedItems.length == 0) {
      this.selectedItems.push(value)
    }
    else if (this.selectedItems.length > 0) {
      if (this.selectedItems.includes(value)) {
        const index = this.selectedItems.indexOf(value);
        if (index !== -1) {
          this.selectedItems.splice(index, 1);
        }
      } else {
        this.selectedItems.push(value)
      }
    }
     this.getDevices()


  }


  getDevices() {
    

    this.cardService.getdevices(this.selectedItems).subscribe(
      (response) => {
        this.data = response.data;
        console.warn("data=====>of datamachines",response.data);
       
      })
   




  };
  isAtleastoneslected():boolean{
    return this.data.some(object => object.checked);
  }

  onClick(deviceId: any): void {
  
    
    if (this.mode === "update") {
      if (this.selectedDevicesId.includes(deviceId)) {
        const index = this.selectedDevicesId.indexOf(deviceId);
    
        if (index !== -1) {
          this.selectedDevicesId.splice(index, 1);
        }
      } else {
        this.selectedDevicesId.push(deviceId);
        console.log("Selected device ID:", deviceId);
      }
    }else{
      if (this.machines.includes(deviceId)) {
        const index = this.machines.indexOf(deviceId);
    
        if (index !== -1) {
          this.machines.splice(index, 1);
        }
      } else {
        this.machines.push(deviceId);
        console.log("Selected device ID:", deviceId);
      }
    }


  // this.getDevices();
}
isAdminLoggedIn(): boolean {
  const loggedInUser = localStorage.getItem("username");
  return loggedInUser.includes("Admin");
}

 
}