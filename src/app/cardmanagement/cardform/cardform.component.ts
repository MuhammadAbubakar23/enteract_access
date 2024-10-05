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
import { AccesspointService } from 'src/app/services/accesspointservice/accesspoint.service';
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
  selector: 'app-cardform',
  templateUrl: './cardform.component.html',
  styleUrls: ['./cardform.component.css']
})

export class CardformComponent implements OnInit {

  isHRLoggedIn(): boolean {
    const loggedInUser = localStorage.getItem("username");
    return loggedInUser.includes("hr");
  }
  
  AccessPoints: any;
  @Input() mode = ""
  @Input() message = []
  card: Card = new Card()
  cities = []
  separatorKeysCodes: number[] = [ENTER, COMMA];
  locations = [];
  accessPoints = [];
  // accessPointsData = [];
  fruits: string[] = ['Lemon'];
  allLocation: string[] = ['Ibex1', 'Ibex2', 'Ibex3'];
  allAccessPoints: string[] = ['IBEX1 GF', 'IBEX2 GF', 'IBT2 Comp'];//Work on this one
  machines = []
  defaultDate = new Date();
  auth: boolean = false;
  locationCtrl = new FormControl('');
  accessPointCtrl = new FormControl('');
  devices: any[] = [];
  data: any;
  form: any;
  Data:any
  getdata:any[]=[];
  filteredlocations: Observable<string[]>;
  filteredAccessPoints: Observable<string[]>;
   cardId:number
  cardForm = new FormGroup(
    {
      City: new FormControl(this.card.city,),
      Location: new FormControl(this.card.location ,[Validators.required]),
      AccessPoint: new FormControl(this.card.accessPoint, [Validators.required]),
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
    private accessPointService: AccesspointService,
    private http: HttpClient,
    private route:ActivatedRoute,
    private cd:ChangeDetectorRef,
    private machineUserService: MachineService,
    public toastr: ToastrService,
    private SpinnerService: NgxSpinnerService,
  ) {
    this.filteredAccessPoints = this.accessPointCtrl.valueChanges.pipe(
      startWith(null),
      map((accesspoint: string | null) => (accesspoint ? this._filter(accesspoint) : this.allAccessPoints.slice())),

    )
  };





cityId:number
  selectedLocationId: number[];
  selectedDevicesId:number[]
  selectedCity: number 
  selectedAccessPoint: number;
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
  this.selectedAccessPoint = res.acc
  console.log("ress++++>",res);
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
        console.warn("data====@@@=>of machine",response.data);
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
    
    const  cityId=event.target.value
    let data={
      Page_No:1,
      ItemsPerPage:100,
      Search:"",
      City_Id: cityId,
      Location_Id:0,
      Floor_Id:0,
      Sort:""
    }
    
    this.accessPointService.getAll(data).subscribe((res: any) => {
     this.accessPoints = res.data.result;
     
     console.log("Access Points====++++=>",res.data);
    // const  cityId=event.target.value
    // this.cardService.getDevicesByLocation(cityId).subscribe((res: any) => {
    //  this.locations =res.data
    //  
    //  console.log("locations====++++=>",res.data);

 
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

    this.accessPointCtrl.setValue(null);



  }


  selected(event: MatAutocompleteSelectedEvent): void {

    
    this.accessPoints.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.accessPointCtrl.setValue(null);

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
    // this.getAllAccessPoints();


  }
  getAllAccessPoints() {
    let data={
      Page_No:1,
      ItemsPerPage:100,
      Search:"",
      City_Id:0,
      Location_Id:this.selectedItems,
      Floor_Id:0,
      Sort:""
    }
    this.SpinnerService.show();
    this.accessPointService.getAll(data).subscribe((res: any) => {
      console.log("Hello===>", res.data);
      this.SpinnerService.hide();
      
     
      // this.getDevices()
      this.AccessPoints = res.data.result;
      
      // this.Starting_Point=res.data.startingpoint;
      // this.Ending_Point=res.data.endingpoint;
      // this.accesspointCount=res.data.count;
      // console.log(this.Device)
    })

  }


  getDevices() {
    
    this.machines = [];
    this.cardService.getDevicesByAccessPoint(this.selectedAccessPoint).subscribe(
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
        console.log("Selected Machines: ", this.machines);
      }
    }


  // this.getDevices();
}
isAdminLoggedIn(): boolean {
  const loggedInUser = localStorage.getItem("username");
  return loggedInUser.includes("Admin");
}

 
}