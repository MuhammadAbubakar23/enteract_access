import { Component, OnInit } from '@angular/core';
import { NgForm, Validators, FormControl, FormGroup, FormControlName } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MachineService } from '../services/machineuserservice/machine.service';
interface ImageUploadResponse {
  statusCode: number;
  message: string;
  error?: string;
  birthday: string

}  

@Component({
  selector: 'app-employee-info',
  templateUrl: './employee-info.component.html',
  styleUrls: ['./employee-info.component.css']
})



export class EmployeeInfoComponent implements OnInit {
  file: File;
  emplId: any = "";
  password: any = "";

  constructor(private machineUserService: MachineService,
    public toastr: ToastrService,) { }
  myForm = new FormGroup({
    user: new FormControl('', Validators.required),
    pass: new FormControl('', Validators.required)
  })

  get user() {
    return this.myForm.get('user')
  }
  get pass() {
    return this.myForm.get('pass')
  }


  ngOnInit(): void {

  }

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
    uploadData.append('Employee_Id', this.emplId);
    uploadData.append('file', this.file);
    uploadData.append('password', this.password);
    console.log(uploadData)
    this.machineUserService.imageUpload(uploadData).subscribe(
      (response: ImageUploadResponse) => {  
        console.log(response);
        if (response.statusCode === 200) {
          this.toastr.success("Profile is added Successfully", "Success");
        } else {
          this.toastr.error(response.error, "Error");
        }
      },
      error => {
        console.log(error);
        this.toastr.error("Something went wrong", "Error");
      }
    );   
  }
}
