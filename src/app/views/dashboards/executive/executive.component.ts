import { Component, OnInit } from '@angular/core';
import { DatashareService } from 'src/app/services/datashareservice/datashare.service';
import { DepartmentService } from 'src/app/services/departmentservice/department.service';
import { NgxSpinnerService } from 'ngx-spinner';
import * as echarts from 'echarts';
import { ExecutiveDashboardService } from 'src/app/services/executive-dashboard-services/executive-dashboard.service';
import { LocationService } from 'src/app/services/locationservices/location.service';

@Component({
  selector: 'app-executive',
  templateUrl: './executive.component.html',
  styleUrls: ['./executive.component.css']
})
export class ExecutiveComponent implements OnInit {
  message: any = {
    title: "Dashboard",
    Icon: "fal fa-gauge",
    subTitle: "",
    Url: "/dashboard/dashboards/executive",
    subTabs: [
    { name: "Executive" , url: "/dashboard/dashboards/executive", isActive: true},
    { name: "Vehicles" , url: "/dashboard/dashboards/vehicles", isActive: false},
    { name: "Devices" , url: "/dashboard/dashboards/devices", isActive: false}
    ]
  };
  department: any = "";
  location: any = "";
  employeeCheckInDto: any;
  productivityHrsDto: any;
  response: any;
  visitorsMgmtOutComesDto: any;
  allPercentagesDto: any;
  progressDepartmentWiseDto: any;
  cityWiseAvailableEmployeeDto: any;
  listPeakHours: any;
  Days: any[]=[];
  Data: any[]=[];
  constructor( private LS: LocationService, private sharedata: DatashareService, private depService: DepartmentService, private SpinnerService: NgxSpinnerService, private executiveDashboardService: ExecutiveDashboardService ) { }
  departments: any;
  depatmentname: any;
  locations:any = ["Lahore","Karachi", "Islamabad"];
  dateTime:any="";

  ngOnInit(): void {
    this.sharedata.sendMessage(this.message);
    this.getLocations();
    this.getData();
    this.getAllDepartments();
    // this.populateCheckInGraph();
    // this.productivityGraph();
    // this.createBarChart();
    // this.HeatMapGraph();
  }
  getLocations(){
    
    this.LS.getAllLocations().subscribe((res:any)=>{
      this.locations = res.data;
      console.log("locations response:--->", this.locations);
    })
  }

  getAllDepartments() {
    this.SpinnerService.show();
    this.depService.getAll().subscribe((res: any) => {
      this.departments = res;
      this.depatmentname = this.departments;
      console.log("Departments====>@@", this.departments);
      this.SpinnerService.hide();
    })
  }


  getData(){
    const data = {
      "Department": this.department,
      "Location": this.location,
      "StartDT": this.dateTime
    }
    this.executiveDashboardService.getExecutiveDashboard(data).subscribe((res: any)=>{
      this.response = res.data;
      this.employeeCheckInDto = res.data.employeeCheckInDto;
      this.populateCheckInGraph();
      this.productivityHrsDto = res.data.productivityHrsDto;
      this.productivityGraph();
      this.visitorsMgmtOutComesDto = res.data.visitorsMgmtOutComesDto;
      this.allPercentagesDto = res.data.allPercentagesDto;
      this.progressDepartmentWiseDto = res.data.progressDepartmentWiseDto;
      this.createBarChart();
      this.cityWiseAvailableEmployeeDto = res.data.cityWiseAvailableEmployeeDto;
      this.EmployeesAvailabilityGraph();
      this.listPeakHours = res.data.presentsByHourInMonthDto?.listPeakHours;

      var index = 0;
      this.listPeakHours?.forEach((item)=>{
        this.Days.push(item.day);
        item.listHourlyCount.forEach((Hour)=>{
          var array:any[]=[];
          array.push(index);
          array.push(Hour.hour);
          array.push(Hour.countOfHour);
          this.Data.push(array);
        })
        index++;
      })
      this.HeatMapGraph();
      console.log("response", res.data);
    });
  }
  populateCheckInGraph() {
    type EChartsOption = echarts.EChartsOption;
  
    var chartDom = document.getElementById('checkInGraph')!;
    var myChart = echarts.init(chartDom);
    var option: EChartsOption;
  
    option = {
      color: ['#8770e0', '#add376'],
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c} ({d}%)'
      },
      series: [
        {
          type: 'pie',
          radius: ['50%', '83%'],
          avoidLabelOverlap: true,
          padAngle: 4,
          label: {
            show: true,
            position: 'outside',
            formatter: '{b}',
            fontSize: 12,
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 16,
            },
            scale: true,
            scaleSize: 7
          },
          labelLine: {
            show: true,
            length: 15,
            length2: 10
          },
          data: [
            { value: this.employeeCheckInDto?.scheduledCheckIn, name: 'Schedule Check-In' },
            { value: this.employeeCheckInDto?.unscheduledCheckIn, name: 'Unscheduled Check-In' }
          ]
        }
      ]
    };
  
    option && myChart.setOption(option);
  }
  
  productivityGraph(){
    type EChartsOption = echarts.EChartsOption;

    var chartDom = document.getElementById('productivityGraph')!;
    var myChart = echarts.init(chartDom);
    var option: EChartsOption;
    
    option = {
      tooltip: {
        trigger: 'item',
        formatter: function (params) {
          var hours = Math.floor(params.value / 60);
          var minutes = params.value % 60;
          // return `${params.name}: ${hours} hours ${minutes} minutes (${params.percent}%)`;
          return `${hours} hours ${minutes} minutes`;
        }
      },
      color: ['#ff6867', '#3cc480'],
      series: [
        {
          type: 'pie',
          radius: ['50%', '83%'],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              formatter: ['{percentage|{d}%}\n', '{name|{b}}'].join(''),
              rich: {
                percentage: {
                  fontSize: 20,
                  fontWeight: 'bold',
                  lineHeight: 40,
                  color: '#000'
                },
                name: {
                  fontSize: 10,
                  fontWeight: 'normal',
                  lineHeight: 20,
                  color: '#000'
                }
              },
              align: 'center',
              verticalAlign: 'middle'
            }
          },
          labelLine: {
            show: false
          },
          data: [
            { value: this.productivityHrsDto?.nonProductiveHours, name: 'Non-Productive Hours' },
            { value: this.productivityHrsDto?.productiveHours, name: 'Productive Hours' }
          ]
        }
      ]
    };
    
    option && myChart.setOption(option);
    
    
  }

  createBarChart() {
    var chartDom = document.getElementById('barChart')!;
    var myChart = echarts.init(chartDom);

    // var data = [40, 82, 23, 76, 85, 74, 77, 55, 55, 52, 73, 10];
    // var categories = ['IT', 'Admin', 'Hr', 'Finance', 'Tech', 'OPs Int', 'OPs Loc', 'Ibex IT', 'Ops Support', 'Callers', 'Ops', 'Others'];
    var data;
    var categories;
    this.progressDepartmentWiseDto?.forEach(item => {
      data.push(item?.departmentName);
      categories.push(item?.DepartmentProgress);
    });
    
    var formattedData = data?.map(value => ({
      value,
      itemStyle: {
        color: value < 60 ? '#6b75ca' : '#a4ace2'
      }
    }));
  
    var option = {
      tooltip: {},
      xAxis: {
        type: 'category',
        data: categories,
        axisLabel: {
          rotate: 45,
        }
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: formattedData,
          type: 'bar'
        }
      ]
    };
  
    myChart.setOption(option);
  }

  EmployeesAvailabilityGraph(){
    // var data = [
    //   { "cityName": 'Lahore', "totalEmployeeInCity": "90", "totalCheckedInCity": "60" },
    //   { "cityName": 'Islamabad', "totalEmployeeInCity": "85", "totalCheckedInCity": "55" },
    //   { "cityName": 'Karachi', "totalEmployeeInCity": "75", "totalCheckedInCity": "40" }
    // ]
    var data = this.cityWiseAvailableEmployeeDto;

    type EChartsOption = echarts.EChartsOption;

    var chartDom = document.getElementById('EmployeesAvailabilityGraph')!;
    var myChart = echarts.init(chartDom);
    var option: EChartsOption;

    option = {
      legend: {
        bottom: 0
      },
      color: ['#0e90e2', '#cbe2f2'],
      tooltip: {},
      dataset: {
        dimensions: ['cityName', 'totalEmployeeInCity', 'totalCheckedInCity'],
        source: data
      },
      xAxis: { type: 'category' },
      yAxis: {},
      series: [
        {
          type: 'bar',
          emphasis: {
          }
        },
        {
          type: 'bar',
          emphasis: {
          }
        }
      ]
    };

    option && myChart.setOption(option);

  }

  HeatMapGraph(){
    type EChartsOption = echarts.EChartsOption;

    var chartDom = document.getElementById('HeatMapGraph')!;
    var myChart = echarts.init(chartDom);
    var option: EChartsOption;
    
    const hours = [
      '0',
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8a',
      '9',
      '10',
      '11',
      '12',
      '13',
      '14',
      '15',
      '16',
      '17',
      '18',
      '19',
      '20',
      '21',
      '22',
      '23'
    ];
    
    // const days = [
    //   'Saturday',
    //   'Friday',
    //   'Thursday',
    //   'Wednesday',
    //   'Tuesday',
    //   'Monday',
    //   'Sunday'
    // ];
    // const data = [
    //   [0, 0, 15],
    //   [0, 1, 10],
    //   [0, 2, 5],
    //   [0, 3, 5],
    //   [0, 4, 5],
    //   [0, 5, 5],
    //   [0, 6, 5],
    //   [0, 7, 5],
    //   [0, 8, 5],
    //   [0, 9, 5],
    //   [0, 10, 5],
    //   [0, 11, 12],
    //   [0, 12, 14],
    //   [0, 13, 11],
    //   [0, 14, 11],
    //   [0, 15, 13],
    //   [0, 16, 14],
    //   [0, 17, 16],
    //   [0, 18, 14],
    //   [0, 19, 14],
    //   [0, 20, 13],
    //   [0, 21, 13],
    //   [0, 22, 12],
    //   [0, 23, 15],
    //   [1, 0, 17],
    //   [1, 1, 10],
    //   [1, 2, 5],
    //   [1, 3, 5],
    //   [1, 4, 5],
    //   [1, 5, 5],
    //   [1, 6, 5],
    //   [1, 7, 5],
    //   [1, 8, 5],
    //   [1, 9, 5],
    //   [1, 10, 15],
    //   [1, 11, 12],
    //   [1, 12, 12],
    //   [1, 13, 16],
    //   [1, 14, 19],
    //   [1, 15, 21],
    //   [1, 16, 16],
    //   [1, 17, 17],
    //   [1, 18, 18],
    //   [1, 19, 22],
    //   [1, 20, 15],
    //   [1, 21, 15],
    //   [1, 22, 17],
    //   [1, 23, 12],
    //   [2, 0, 11],
    //   [2, 1, 11],
    //   [2, 2, 5],
    //   [2, 3, 5],
    //   [2, 4, 5],
    //   [2, 5, 5],
    //   [2, 6, 5],
    //   [2, 7, 5],
    //   [2, 8, 5],
    //   [2, 9, 5],
    //   [2, 10, 13],
    //   [2, 11, 12],
    //   [2, 12, 11],
    //   [2, 13, 19],
    //   [2, 14, 18],
    //   [2, 15, 20],
    //   [2, 16, 16],
    //   [2, 17, 15],
    //   [2, 18, 15],
    //   [2, 19, 15],
    //   [2, 20, 17],
    //   [2, 21, 14],
    //   [2, 22, 12],
    //   [2, 23, 14],
    //   [3, 0, 17],
    //   [3, 1, 13],
    //   [3, 2, 5],
    //   [3, 3, 5],
    //   [3, 4, 5],
    //   [3, 5, 5],
    //   [3, 6, 5],
    //   [3, 7, 5],
    //   [3, 8, 11],
    //   [3, 9, 5],
    //   [3, 10, 15],
    //   [3, 11, 14],
    //   [3, 12, 17],
    //   [3, 13, 24],
    //   [3, 14, 23],
    //   [3, 15, 22],
    //   [3, 16, 19],
    //   [3, 17, 15],
    //   [3, 18, 15],
    //   [3, 19, 20],
    //   [3, 20, 16],
    //   [3, 21, 14],
    //   [3, 22, 14],
    //   [3, 23, 11],
    //   [4, 0, 11],
    //   [4, 1, 13],
    //   [4, 2, 5],
    //   [4, 3, 5],
    //   [4, 4, 5],
    //   [4, 5, 11],
    //   [4, 6, 5],
    //   [4, 7, 5],
    //   [4, 8, 5],
    //   [4, 9, 12],
    //   [4, 10, 14],
    //   [4, 11, 14],
    //   [4, 12, 12],
    //   [4, 13, 14],
    //   [4, 14, 14],
    //   [4, 15, 24],
    //   [4, 16, 22],
    //   [4, 17, 11],
    //   [4, 18, 18],
    //   [4, 19, 15],
    //   [4, 20, 13],
    //   [4, 21, 17],
    //   [4, 22, 13],
    //   [4, 23, 10],
    //   [5, 0, 12],
    //   [5, 1, 11],
    //   [5, 2, 5],
    //   [5, 3, 13],
    //   [5, 4, 5],
    //   [5, 5, 5],
    //   [5, 6, 5],
    //   [5, 7, 5],
    //   [5, 8, 12],
    //   [5, 9, 5],
    //   [5, 10, 14],
    //   [5, 11, 11],
    //   [5, 12, 15],
    //   [5, 13, 20],
    //   [5, 14, 15],
    //   [5, 15, 17],
    //   [5, 16, 21],
    //   [5, 17, 16],
    //   [5, 18, 10],
    //   [5, 19, 15],
    //   [5, 20, 13],
    //   [5, 21, 14],
    //   [5, 22, 12],
    //   [5, 23, 10],
    //   [6, 0, 11],
    //   [6, 1, 10],
    //   [6, 2, 5],
    //   [6, 3, 5],
    //   [6, 4, 5],
    //   [6, 5, 5],
    //   [6, 6, 5],
    //   [6, 7, 5],
    //   [6, 8, 5],
    //   [6, 9, 5],
    //   [6, 10, 11],
    //   [6, 11, 5],
    //   [6, 12, 12],
    //   [6, 13, 11],
    //   [6, 14, 13],
    //   [6, 15, 14],
    //   [6, 16, 10],
    //   [6, 17, 10],
    //   [6, 18, 10],
    //   [6, 19, 10],
    //   [6, 20, 11],
    //   [6, 21, 12],
    //   [6, 22, 12],
    //   [6, 23, 16]
    // ].map(function (item) {
    //   return [item[1], item[0], item[2] || '-'];
    // });
    const data = this.Data.map(function (item) {
      return [item[1], item[0], item[2] || '-'];
    });
    option = {
      tooltip: {
        position: 'top'
      },
      grid: {
        height: '90%',
        width: '90%',
        top: '10%'
      },
      xAxis: {
        type: 'category',
        data: hours,
        axisLine: { show: false},
        axisTick: { show: false},
        axisLabel: { show: true,  margin: 20},
        splitArea: {
          show: true
        },
        splitLine :{

          show: true,
          lineStyle: {
            color: 'white',
            width: 3,
          }
        },
                

      },
      yAxis: {
        type: 'category',
        data: this.Days,
        axisLine: { show: false},
        axisTick: { show: false},
        axisLabel: { show: true,  margin: 20},
        splitArea: {
          show: true
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: 'white',
            width: 3,
          }
        }
        
      },
      visualMap: {
        min: 0,
        max: 14,
        show: false,
        calculable: true,
        orient: 'horizontal',
        left: 'center',
        bottom: '15%',
        inRange: {
          color: ['#c1e2f8', '#008de6']
        }
      },
      series: [
        {
          type: 'heatmap',
          data: data,
          label: {
            show: true,
            fontSize: 11,
            // fontWeight: 'bold'
          },
          itemStyle: {
            borderColor: '#fff',
            borderWidth: 1
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
    
    option && myChart.setOption(option);  
    
  }
}
