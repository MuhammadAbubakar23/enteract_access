import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

import { ToastrService } from 'ngx-toastr';
import { CardService } from 'src/app/services/CardService/card.service';
import { DatashareService } from 'src/app/services/datashareservice/datashare.service';
import { SignalRService } from 'src/app/services/signalR.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-bulkupload',
  templateUrl: './bulkupload.component.html',
  styleUrls: ['./bulkupload.component.css']
})


export class BulkuploadComponent implements OnInit {
  progress: number = 0;
  totalRecords: any[] = [];
  successRecords: any[] = [];
  errorRecords: any[] = [];
  isShowProgress: boolean = false;
  isResultshow: boolean = false;
  isUploadShow: boolean = true;
  showErrors: boolean = false;
  showAll: boolean = false;
  fileSizeInKB: any;
  usetotalRecords = false;
  errors = true;
  isReviwed=false;
  isFileUploaded:boolean=false;
 
  excelData:any[]=[];
  itemsRecods:any[]=[];
  // message: string[] = ["Access Cards", "Bulk Upload", "", "", "", "", "", "", "fa-light fa-address-card", "cardmanagement/listofcards", "cardmanagement/bulkupload", "breadcrumb-item active"]
  message : any = {
    title: "Access Cards",
    Icon: "fa-light fa-address-card",
    subTitle: "Bulk Upload",
    Url: "cardmanagement/listofcards"
  }
  selectedFile: File | null = null;
  constructor(
    private dataShare: DatashareService,
    private cardService: CardService, private signalRService: SignalRService,
    private toaster: ToastrService,
    private router:Router, private spinner: NgxSpinnerService,
  ) { 
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
  }
  bulkForm = new FormGroup(
    {
      FileName: new FormControl('', [Validators.required])
    }
  )

  ngOnInit(): void {
    this.dataShare.sendMessage(this.message)
    this.signalRService.startConnection();
    this.signalRService.progressValue$.subscribe((newvalue) => {
      
      this.progress = newvalue
      if (this.progress != null) {
        this.isUploadShow = false;
        this.isShowProgress = true;
        console.log(this.progress)
      }

    })

  }
  fileError:boolean=false;
  browsedFile: File = null;
  
  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
    const fileSizeInBytes = this.selectedFile.size;
    this.fileSizeInKB = fileSizeInBytes / 1024;
    this.fileSizeInKB=this.fileSizeInKB.toFixed(2);
 

  }
  

  onUpload()
   {
  
    const formData = new FormData();
    console.log(this.selectedFile)
    formData.append('file', this.selectedFile);
  
  
    this.cardService.uploadFile(formData).subscribe((response: any) => {
      
      console.log("response==>", response)
      this.isFileUploaded = true;
      if (response.status == 200) {
      
        this.isResultshow = true
        this.isUploadShow = false;

        this.totalRecords = response.data
        response.data.forEach((record: any) => {
        
          if (record.error== null || record.error=="") {
            this.successRecords.push(record)
          }
          else {
            this.errorRecords.push(record)
          }
          this.showErrors = true
          this.isShowProgress = false;
        })
        

      }
      else {
        this.toaster.error(response.message, "Error")
      }

      (error: any) => {
        console.log('Upload error:', error)
      }
      console.log(this.successRecords,"success")  
      console.log(this.errorRecords,"error")
      console.log(this.totalRecords,"total")
    }
    );
  }

  review() {
    this.errors = false;
    this.isReviwed=false
  }
  generateExcelFile() {
    const worksheet = XLSX.utils.json_to_sheet(this.successRecords);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    const buffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    return blob;
  }
  uploadSuccessFile(){
    this.cardService.successuploadFile(this.successRecords).subscribe((res:any)=>{
console.log("Success!",res);
      if(res.status == 200){
        this.router.navigateByUrl("/dashboard/cardmanagement/listofcards")
        this.toaster.success(" Records SuccessFully Added!", "Success")
      }
      else{
        this.toaster.error(res.message, "Error")
      }
    })
  }
  items = [
    { label: 'Created Date', selected: true },
    { label: 'Employee Name', selected: false },
     { label: 'EmployeeId', selected: false },
    { label: 'RFID', selected: false },
    { label: 'Location', selected: false },
    { label: 'Machine IP', selected: false },
    { label: 'Department', selected: false },
    { label: 'Designation', selected: false }
    ];
   selectedItems: any[]=[];
   isSelected(item:any){
     return this.selectedItems.indexOf(item) !==-1;
   }
  
   selectAllChecked: boolean = false;
   toggleAllCheckboxes(){
  for (let card of this.totalRecords ){
    card.isSelected=this.selectAllChecked
  }
  console.log("this.totalRecodes===>",this.totalRecords)

   }
   deletedRecodes(){
    this.totalRecords= this.totalRecords.filter ((card)=> !card.isSelected)
    // this.toaster.success("Selected card is delted")
    this.selectAllChecked=false;
    console.log("AfterdeletedRecodes===>",this.totalRecords)
   }
   downlaodedfile(){
    this.totalRecords=this.totalRecords
   }
   

   downlaoded(){
  
        
        const uploaded:FormData= new FormData()
      uploaded.append('file',this.selectedFile)
       console.log("file that selected ////////",this.selectedFile)
       this.cardService.downloadedCvs(uploaded).subscribe((res:any)=>{
            console.log("downlaoded file",res);
            if (res.status==200){
             this.router.navigateByUrl("dashboard/cardmanagement/listofcards")
             this.toaster.success( "Records  Successfully deleted ",'Success')
             
            }
           else{
             this.toaster.error(res.error,'error')
           }
       },
       error => {
         console.log(error);
         this.toaster.error("Something went wrong", "Error");
       }
       )
      }
   
   
   }
  

