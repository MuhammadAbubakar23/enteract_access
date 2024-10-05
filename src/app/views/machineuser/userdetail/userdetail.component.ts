import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatashareService } from 'src/app/services/datashareservice/datashare.service';
import { MachineService } from 'src/app/services/machineuserservice/machine.service';
import * as echarts from 'echarts';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { ElementRef, ViewChild} from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocomplete } from '@angular/material/autocomplete';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { DatePipe } from '@angular/common';


export class Pill {
  constructor(public rfid: string, public validityDate: string) {}
}



@Component({
  selector: 'app-userdetail',
  templateUrl: './userdetail.component.html',
  styleUrls: ['./userdetail.component.css']
})
export class UserdetailComponent implements OnInit {

  currentDate = new Date();
  User: any = {};
  attendanceGraphData: any []= [];
  cities: any = this.User?.userDetails?.employeeCity;
  location: any = this.User?.userDetails?.employeeLocation;
  startTime: any = "" ;
  endTime: any = "" ;
  // rfid: string = '';
  // validityDate: string = '';
  pageNumber: any = 1;
  totalPages: number = 10; 
  recordsPerPage: number = 10;
  displayLogRecords: any[] = [];
  totalAttendance: number = 0;
  flag = true;


  constructor(private activatedRoute: ActivatedRoute,
    private machineUserService: MachineService, private datePipe: DatePipe,
    private dataShare: DatashareService, private spinner: NgxSpinnerService,) {
    // this.spinner.show();
    // setTimeout(() => {
    //   this.spinner.hide();
    // }, 4000);

    this.filteredTeams = this.teamCtrl.valueChanges.pipe(
      startWith(null),
      map((team: string | null) => team ? this._filter(team) : this.allTeams.slice()));
  }

  id = Number(this.activatedRoute.snapshot.params['id']);

  message: any = {
    title: "Users",
    Icon: "fal fa-users-class",
    subTitle: "User Details",
    Url: "/dashboard/listofusers"
  }

  ngOnInit(): void {
    this.getCurrentMonthDateFormatted();
    console.log("Selected User Id=====>", this.id);
    this.getUserDetails();
    this.getCurrentMonthDateFormatted();
    console.log("start time " + this.startTime);
    console.log("end time " + this.startTime);
    this.pills = [
      new Pill('RF1233458', '2024-08-05T00:00'),
      new Pill('RF1321546', '2024-08-06T00:00')
    ];
  }

  ngAfterViewInit(): void {
    this.dataShare.sendMessage(this.message);
  }


  getCurrentMonthDateFormatted() {
    const today = new Date();
    this.startTime = this.datePipe.transform(today, 'yyyy-MM-ddTHH:mm');
    this.endTime = this.datePipe.transform(today, 'yyyy-MM-ddTHH:mm');
  }
  
  

  updateDetailsForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    id: new FormControl(''), //, [Validators.required]
    mobile: new FormControl('', [ Validators.required, Validators.minLength(11), Validators.maxLength(13)]),
    city: new FormControl('', [Validators.required]),
    location: new FormControl('', [Validators.required]),
    cnic: new FormControl('', [ Validators.required, Validators.minLength(13), Validators.maxLength(13)]),
    entity: new FormControl('', [Validators.required]),
    department: new FormControl('', [Validators.required]),
    team: new FormControl('', [Validators.required]),
    group: new FormControl('', [Validators.required]),
    designation: new FormControl('', [Validators.required]),
  });
  

  get vf() {
    return this.updateDetailsForm.controls;
  };

  selectedCity(event:any){
    this.cities= event.target.value;
  };

  selectedLocation(event:any){
    this.location= event.target.value;
  }
  
  getUserDetails() {
    
    var data = {
      "id": this.id,
      "StartDateTime": this.startTime,
      "EndDateTime": this.endTime,
      "PageNumber": this.pageNumber
    }
    console.log(data);
    this.machineUserService.GetUserAccountDetails(data).subscribe((res:any)=>{
      this.User = res.data;
      this.totalPages = Math.ceil(this.User.activityLogs.length / this.recordsPerPage);
      const startIndex = (this.pageNumber - 1) * this.recordsPerPage;
      this.displayLogRecords = this.User?.activityLogs.slice(startIndex, startIndex + this.recordsPerPage);
      this.setDataForGraph();
      this.populateImpressionsGraph();
      if ( this.User !== null){
        this.updateDetailsForm.get('name').setValue(this.User?.userDetails?.employeeName );
        this.updateDetailsForm.get('id').setValue(this.User?.userDetails?.employeeID);
        this.updateDetailsForm.get('mobile').setValue(this.User?.userDetails?.employeeMobileNumber);
        this.updateDetailsForm.get('city').setValue(this.User?.userDetails?.employeeCity);
        this.updateDetailsForm.get('location').setValue(this.User?.userDetails?.employeeLocation);
        this.updateDetailsForm.get('cnic').setValue(this.User?.userDetails?.employeeCNIC);
        this.updateDetailsForm.get('entity').setValue(this.User?.userDetails?.employeeEntityName);
        this.updateDetailsForm.get('department').setValue(this.User?.userDetails?.employeeDepartment);
        this.updateDetailsForm.get('team').setValue(this.User?.userDetails?.Enteract);
        this.updateDetailsForm.get('group').setValue(this.User?.userDetails?.employeeGroup);
        this.updateDetailsForm.get('designation').setValue(this.User?.userDetails?.employeeDesignation);
      }
      // this.getRangeText();
      console.log(res);
    });
  }

  submit() {
    if (this.updateDetailsForm.valid) {
      // this.addCar();
      console.log(this.updateDetailsForm.value)
    }
    else {
      this.markFormGroupTouched(this.updateDetailsForm);
    }
    console.log(this.updateDetailsForm.value)
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

  emptyEndDate(){
    this.endTime = "";
  }

  pagination(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.pageNumber = page;
      this.getUserDetails();
    }
  }

  selectedImage: string = 'assets/Images/dummy_profile_picture2.jpg';

  setSelectedImage(imgSource: string) {
    this.selectedImage = imgSource || 'assets/Images/dummy_profile_picture2.jpg';
  }

  // getRangeText(): string {
  //   if (!this.User || !this.User.activityLogs) return '';
  
  //   const start = (this.pageNumber - 1) * this.recordsPerPage + 1;
  //   const end = Math.min(this.pageNumber * this.recordsPerPage, this.User.activityLogs.length);
  //   return `${start}-${end} of ${this.User.activityLogs.length}`;
  // }
  
  

  // onImgError(event: any) {
    
  //   event.target.src = '../../assets/Images/dummy_profile_picture2.jpg';
  // }
  
  // onFileSelected(event: any) {
    
  //   const fileInput = event.target as HTMLInputElement;
  //   const file = fileInput.files[0];
  //   if (file) {
  //     const formData = new FormData();
  //     formData.append('file', file);

  //     this.machineUserService.uploadImage(formData, this.id).subscribe((res:any)=>{
  //       console.log('Image upload response:', res);
  //     }, error => {
  //       console.error('Image upload error:', error);
  //     })
  //   }
  // }

  populateImpressionsGraph() {
    type EChartsOption = echarts.EChartsOption;

    var chartDom = document.getElementById('ImpressionsGraph')!;
    var myChart = echarts.init(chartDom);
    var option: EChartsOption;
    
    option = {
      tooltip: {
        trigger: 'item'
      },
      series: [
        {
          type: 'pie',
          radius: ['70%', '85%'],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: false,
              fontSize: 20,
              fontWeight: 'bold',
              formatter: '{c}%'
            }
          },
          labelLine: {
            show: false
          },
          color: 
          [
            '#b5e4ca',
            '#cabdff',
            '#2a85ff'
          ],
          data: this.attendanceGraphData
        }
      ],
      graphic: {
        tooltip: {
          show: true,
          formatter: `Total : ${this.totalAttendance}`,
        },
        elements: [
          {
            type: 'text',
            left: 'center',
            top: '38%',
            style: {
              text: this.totalAttendance?.toString(),
              fontSize: 24,
              fontWeight: 'bold',
              fill: '#000',
            }
          },

        ]
      }
    }
    option && myChart.setOption(option);
  }


  setDataForGraph() {
    this.attendanceGraphData = [
      { 
        value: this.User?.attendanceDetailsDto?.totalPresentPerc || 0 , name: 'Present' 
      },
      {
        value: this.User?.attendanceDetailsDto?.totalAbsentPerc || 0 , name: 'Absent' 
      },
      {
        value: this.User?.attendanceDetailsDto?.totalLeavePerc || 0 , name: 'Leave' 
      },
    ];

    this.totalAttendance = this.User?.attendanceDetailsDto?.overAllPercOfMonth || 0;

  }


  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  teamCtrl = new FormControl();
  filteredTeams: Observable<string[]>;
  selectedTeams: string[] = [];
  allTeams: string[] = ['Team Admin', 'Team Members', 'Support Team', 'Finance Team', 'Design Team'];

  @ViewChild('teamInput') teamInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  add(event: MatChipInputEvent): void {
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      if ((value || '').trim()) {
        this.selectedTeams.push(value.trim());
      }

      if (input) {
        input.value = '';
      }

      this.teamCtrl.setValue(null);
    }
  }

  remove(team: string): void {
    const index = this.selectedTeams.indexOf(team);

    if (index >= 0) {
      this.selectedTeams.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.selectedTeams.push(event.option.viewValue);
    this.teamInput.nativeElement.value = '';
    this.teamCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allTeams.filter(team => team.toLowerCase().includes(filterValue));
  }

  pills: Pill[] = [];
  rfid: string = '';
  validityDate: string = '';

  formatDate(date: Date): string {
    const pad = (n: number) => n < 10 ? '0' + n : n;
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
  }

  addPill() {
    if (this.rfid && this.validityDate) {
      const validityDate = new Date(this.validityDate);
      if (!isNaN(validityDate.getTime())) {
        const formattedDate = this.formatDate(validityDate);
        this.pills.push(new Pill(this.rfid, formattedDate));
        console.log("Added Card Number " + this.rfid);
        console.log("Added Validity Date " + formattedDate);
        this.rfid = '';
        this.validityDate = '';
      } else {
        console.log('Invalid date');
      }
    } else {
      console.log('RFID and Validity Date are required');
    }
  }

  editPill(pill: Pill) {
    console.log('Edit:', pill);
  }

  removePill(pill: Pill) {
    this.pills = this.pills.filter(p => p !== pill);
    console.log('Removed:', pill);
  }

  savePill() {
    this.addPill();
  }

}
