import { Component, ElementRef, OnInit } from '@angular/core';
import { NgForm, Validators, FormControl, FormGroup, FormControlName } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ViewChild } from '@angular/core';
import { MachineService } from 'src/app/services/machineuserservice/machine.service';
interface ImageUploadResponse {
  status: number;
  message: string;
  error?: string;
  birthday: string;
  data: string;
}

@Component({
  selector: 'app-cctv-employee-info',
  templateUrl: './cctv-employee-info.component.html',
  styleUrls: ['./cctv-employee-info.component.css']
})
export class CctvEmployeeInfoComponent implements OnInit {


  @ViewChild('fileInput') myInputVariable: ElementRef;
  reset() {
    // console.log(this.myInputVariable.nativeElement.files);
    this.myInputVariable.nativeElement.value = "";
    // console.log(this.myInputVariable.nativeElement.files);
}

  file: File;
  emplId: any = "";

  constructor(private machineUserService: MachineService,
    public toastr: ToastrService, private rout: Router,) { }
  myForm = new FormGroup({
    user: new FormControl('', Validators.required),
  })

  get user() {
    return this.myForm.get('user')
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
  // reload() {
  //   this.rout.navigateByUrl(`/employee-info/cctv-employee-info`)
  // };


  newFile() {

    
    if (!this.file) {
      this.toastr.error("You must select an image");
      return;
    }

    var uploadData: FormData = new FormData();
    // uploadData.append('Employee_Id', this.emplId);
    uploadData.append('file', this.file);
    console.log(uploadData);

    this.machineUserService.uploadImage(uploadData, this.emplId).subscribe(
      (response: ImageUploadResponse) => {
        console.log(response);

        if (response.status === 200 && response.data == "Image saved" && uploadData.has('file')) {
          
          this.toastr.success(response.data,"Success",{positionClass:"toast-center-center"})
          // this.toastr.success(response.data);
          this.myForm.reset(); 
          this.file = null; 
          this.url = null; 
          this.msg = ""; 
          this.emplId = ""; 
          this.reset();
          // this.myForm.get('user').setValue("");
          // this.emplId = "";
          // this.file = this.file;
          // this.toastr.success("Profile is added Successfully", "Success");
        } else if (response.status === 200 && response.data == "Employee id not found!") {
          this.toastr.error(response.data);
        }
        // else if (response.status === 200 && !uploadData.has('file')) {
        //   this.toastr.error("You must select an image");
        // }
      },
      error => {
        console.log(error);
        this.toastr.error("Something went wrong", "Error");
      }
    );
  }

}

