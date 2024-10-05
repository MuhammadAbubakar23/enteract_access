import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DatashareService } from 'src/app/services/datashareservice/datashare.service';
import { MachineService } from 'src/app/services/machineuserservice/machine.service';
import { ToastrService } from 'ngx-toastr';
import { SignalRService } from 'src/app/services/signalR.service';
import { FormControlName, FormBuilder, FormControl, FormGroup, Validator, Validators } from '@angular/forms';

import * as XLSX from 'xlsx';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';



@Component({
  selector: 'app-bulkupload',
  templateUrl: './bulkupload.component.html',
  styleUrls: ['./bulkupload.component.css']
})
export class BulkuploadComponent implements OnInit {
  process: number = 0;
  totalRecords: any[] = [];
  successRecords: any[] = [];
  errorRecords: any[] = [];
  isShowProgress: boolean = false;
  isResultshow: boolean = false;
  isUploadShow: boolean = true;
  showErrors: boolean = false;
  showAll: boolean = false; S
  fileSizeInKB: any;
  usetotalRecords = false;
  errors = true;
  isReviwed = false;
  isFileUploaded: boolean = false;
  selectedFile: File | null = null;
  // message: string[] = ["Users", "Bulk Upload", "Users", "Teams", "/dashboard/listofusers",
  //  "/dashboard/listofteams", "fal fa-users", "fal fa-users-class", "fal fa-users-class","listofusers","listofusers/machineuserbulkdata","breadcrumb-item active"];

  message: any = {
    title: "Users",
    Icon: "fal fa-users",
    subTitle: "Bulk Upload",
    Url: "/dashboard/listofusers"
  }

  constructor(private machineUserService: MachineService,
    private dataShare: DatashareService,
    private toaster: ToastrService,
    private singalR: SignalRService,
    private changeDetector: ChangeDetectorRef,
    private router: Router, private spinner: NgxSpinnerService,) {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 4000);
  }
  bulkForm = new FormGroup({
    FileName: new FormControl("", Validators.required)
  })

  lengthbar: number;
  ngOnInit(): void {
    
    this.dataShare.sendMessage(this.message);


  }
  fileConverter: any;
  onFileSelected(event: any) {
    
    this.selectedFile = event.target.files[0];
    const fileSizeInBytes = this.selectedFile.size;
    this.fileSizeInKB = fileSizeInBytes / 1024;
    this.fileSizeInKB = this.fileSizeInKB.toFixed(2)
    //     const reader= new FileReader();
    //     reader.onloadend=()=>{
    //       const base64String= reader.result as string;
    //       this.fileConverter(base64String)
    //     }

    //  reader.readAsDataURL(this.selectedFile)


  }

  newFile() {
    this.machineUserService.postUserasBulk(this.successRecords).subscribe((res: any) => {
      console.log("this.sucesses recode ===>", res);
      if (res.statusCode == 200) {
        this.toaster.success("Users Imported Succesfully!", "Success");
        this.router.navigateByUrl('/dashboard/listofusers');
      }
      else {
        this.toaster.error(res.error, "Error")
      }
    })

  }
  totaleuser: any
  onUploadfile() {
    
    var uploadData: FormData = new FormData();
    uploadData.append('file', this.selectedFile, this.selectedFile.name);
    this.machineUserService.fileupload(uploadData).subscribe((res: any) => {
      console.log(res);
      this.isFileUploaded = true;
      if (res.status == 200) {

        this.isResultshow = true
        this.isUploadShow = false;

        this.totalRecords = res.data
        res.data.forEach((record: any) => {

          if (record.error == null || record.error == "") {
            this.successRecords.push(record)
          }
          else {
            this.errorRecords.push(record)
          }
          this.showErrors = true
          //this.isShowProgress = false;
        })
        this.sortTable();

      }
      else {
        this.toaster.error(res.message, "Error")
      }

      (error: any) => {
        console.log('Upload error:', error)
      }
      console.log(this.successRecords, "success")
      console.log(this.errorRecords, "error")
      console.log(this.totalRecords, "total")


    });

    this.singalR.startConnection();
    this.process = 0;
    this.singalR.progressValue$.subscribe((res) => {
      
      this.process = res;
      if (this.process != null) {
        this.isFileUploaded = true;
        this.isShowProgress = true;

      }

      console.log("the proccess bar is ===>", this.process)

      this.changeDetector.detectChanges();
    });


  }

  generateExcelFile() {
    const worksheet = XLSX.utils.json_to_sheet(this.successRecords);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    const buffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    return blob;
  }


  sortTable() {
    this.totalRecords.sort((a, b) => {
      return a.employee_Id - b.employee_Id
    })
  }
  review() {
    this.isReviwed = false;
    this.errors = false
  }

}
