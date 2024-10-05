import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatashareService } from 'src/app/services/datashareservice/datashare.service';
import * as echarts from 'echarts';
import { first } from 'rxjs-compat/operator/first';
import { EChartsOption } from 'echarts';
import { VehiclesDashboardService } from 'src/app/services/vehicles-dashboard-service/vehicles-dashboard.service';
import { debug } from 'console';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent implements OnInit {
  
  @ViewChild('checkInGraph', { static: true }) checkInGraph: ElementRef

  responseData: any = {};
  // random: any;
  location: any = "1";
  startDateTime: any = "";
  days: any[] = [];
  peakHourData: any[] = [];
  titles: any;
  data: any;


  message: any = {
    title: "Dashboard",
    Icon: "fal fa-gauge",
    subTitle: "",
    Url: "/dashboard/dashboards/executive",
    subTabs: [
      { name: "Executive", url: "/dashboard/dashboards/executive", isActive: false },
      { name: "Vehicles", url: "/dashboard/dashboards/vehicles", isActive: true },
      { name: "Devices", url: "/dashboard/dashboards/devices", isActive: false }
    ]
  };

  getCurrentMonthDateFormatted() {
    const today = new Date();
    this.startDateTime = this.datePipe.transform(today, 'yyyy-MM-ddTHH:mm');
  }
  constructor(private sharedata: DatashareService, private SpinnerService: NgxSpinnerService, 
    private vehicleService: VehiclesDashboardService, private datePipe: DatePipe,) { }

  ngOnInit(): void {
    this.sharedata.sendMessage(this.message);
    this.getCurrentMonthDateFormatted();
    this.getVehiclesData();
    console.log("location " + this.location + " and date " + this.startDateTime)
  }
  selectedLocation(event:any){
    this.location= event.target.value;
    this.startDateTime;
    this.getVehiclesData();
  }
  selectedDate(event:any){
    // debugger
    this.startDateTime= event.target.value;
    this.location;
    this.getVehiclesData();
  }

  getVehiclesData(){
    const data = {
      Location: this.location,
      "StartDT": this.startDateTime,
    }
    this.vehicleService.getVehiclesData(data).subscribe((resp: any) =>{
      this.responseData = resp;
      this.updateCharts();
    })
    
  }

  updateCharts(){
    this.fetchPeakHours();
    this.setTitle();
    this.setData();
    this.CheckInGraph();
    this.checkOutGraph();
    this.peakHoursGraph();
  }

  setTitle(){
    this.titles = {
      centralValue1: this.responseData.data?.checkOutsDto.totalCheckOuts,
      subtitle1: 'CheckOut',
      centralValue2: this.responseData.data?.checkInsDto.totalCheckIns,
      subtitle2: 'CheckIn',
    };
  }
  setData() {
    this.data = {
      centralValue1: this.responseData.data?.checkOutsDto.totalCheckOuts,
      subtitle1: 'CheckOut',
      centralValue2: this.responseData.data?.checkInsDto.totalCheckIns,
      subtitle2: 'CheckIn',
      gaugeData1: [
        {
          value: this.responseData.data?.checkOutsDto.registeredCheckOuts,
          name: 'Registered Visitors',
        },
        {
          value: NaN,
          name: ''
        },
        {
          value: this.responseData.data?.checkOutsDto.visitorsCheckOuts,
          name: 'Visitors',
        },
        {
          value: NaN,
          name: ''
        },
        {
          value: this.responseData.data?.checkOutsDto.vendorsCheckOuts,
          name: 'Vendors',
        }
      ],
      gaugeData2: [
        {
          value: this.responseData.data?.checkInsDto.registeredCheckIns,
          name: 'Registered Visitors',
        },
        {
          value: NaN,
          name: ''
        },
        {
          value: this.responseData.data?.checkInsDto.visitorsCheckIns,
          name: 'Visitors',
        },
        {
          value: NaN,
          name: ''
        },
        {
          value: this.responseData.data?.checkInsDto.vendorsCheckIns,
          name: 'Vendors',
        }
      ],
    }
  }


  checkOutGraph(): void {

    type EChartsOption = echarts.EChartsOption;
    var chartDom = document.getElementById('checkOutGraph');
    // if (echarts.getInstanceByDom(chartDom)) {
    //   echarts.getInstanceByDom(chartDom).dispose();
    // }
    var myChart1 = echarts.init(chartDom);
    var option: EChartsOption;
    const centralValue = this.titles.centralValue1;
    const subtitle = this.titles.subtitle1;

    const gaugeData1 = [
      {
        value: this.data.gaugeData1[0].value,
        name: this.data.gaugeData1[0].name,
        itemStyle: {
          color: '#1E8B75',
        }

      },
      {
        value: this.responseData.data?.checkOutsDto.totalCheckOuts,
        name: '',
        itemStyle: {
          color: '#FEFEFE',
        }

      },
      {
        value: this.data.gaugeData1[2].value,
        name: this.data.gaugeData1[2].name,
        itemStyle: {
          color: '#3CC480',
        }

      },
      {
        value: this.responseData.data?.checkOutsDto.totalCheckOuts,
        name: '',
        itemStyle: {
          color: '#FEFEFE',
        }

      },
      {
        value: this.data.gaugeData1[4].value,
        name: this.data.gaugeData1[4].name,
        itemStyle: {
          color: '#FF6867',
        }

      }
    ];

    option = {
      tooltip: {
        show: true,
        position: 'top',
        formatter: function (params) {
          const indicesToShow = [0, 2, 4];
          if (indicesToShow.includes(params.dataIndex)) {
            return `${params.name}: ${params.value}`;
          }
          return null;
        },
      },
      series: [
        {
          type: 'gauge',
          startAngle: 90,
          endAngle: -270,
          radius: "100%",
          min: 0,
          max: this.responseData.data?.checkOutsDto.totalCheckOuts,
          pointer: {
            show: false
          },
          progress: {
            show: true,
            overlap: false,
            roundCap: true,
            clip: false,
            // itemStyle: {
            //   borderWidth: 1,
            //   borderColor: '#464646'
            // }
          },
          axisLine: {
            lineStyle: {
              width: 40,
            }
          },
          splitLine: {
            show: false,
            distance: 0,
            length: 10
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: false,
            distance: 50
          },
          data: gaugeData1,
          title: {
            show: false
          },
          detail: {
            show: false
          }
        }
      ],
      graphic: {
        tooltip: {
          show: true,
          formatter: `Total : ${this.responseData.data?.checkOutsDto.totalCheckOuts}`,
        },
        elements: [
          {
            type: 'text',
            left: 'center',
            top: '36%',
            style: {
              text: centralValue,
              fontSize: 36,
              fontWeight: 'bold',
              fill: '#000',
            }
          },
          {
            type: 'text',
            left: 'center',
            top: '55%',
            style: {
              text: subtitle,
              fontSize: 16,
              fill: '#aaa',
            }
          }
        ]
      }
    };

    // function updateGauge(newData) {
    //   gaugeData[0].value = newData[0];
    //   gaugeData[2].value = newData[1];
    //   gaugeData[4].value = newData[2];
    //   myChart1.setOption({
    //     series: [
    //       {
    //         data: gaugeData
    //       }
    //     ]
    //   });
    // }

    option && myChart1.setOption(option);
  }

checkInChart:any
  CheckInGraph(): void {
    const myDom = this.checkInGraph.nativeElement;
    this.checkInChart = echarts.init(myDom, null, {
      renderer: 'canvas',
      useDirtyRect: false,
    });
    var option: echarts.EChartsOption;
    // var chartDom = document.getElementById('checkInGraph');
    // if (echarts.getInstanceByDom(chartDom)) {
    //   echarts.getInstanceByDom(chartDom).dispose();
    // }
    // var myChart = echarts.init(myDom);
    // var option: EChartsOption;

    const centralValue = this.titles.centralValue2;
    const subtitle = this.titles.subtitle2;

    const gaugeData2 = [
      {
        value: this.data.gaugeData2[0].value,
        name: this.data.gaugeData2[0].name,
        itemStyle: {
          color: '#1E8B75',
        }

      },
      {
        value: this.responseData.data?.checkInsDto.totalCheckIns,
        name: '',
        itemStyle: {
          color: '#FEFEFE',
        }

      },
      {
        value: this.data.gaugeData2[2].value,
        name: this.data.gaugeData2[2].name,
        itemStyle: {
          color: '#3CC480',
        }

      },
      {
        value: this.responseData.data?.checkInsDto.totalCheckIns,
        name: '',
        itemStyle: {
          color: '#FEFEFE',
        }

      },
      {
        value: this.data.gaugeData2[4].value,
        name: this.data.gaugeData2[4].name,
        itemStyle: {
          color: '#FF6867',
        }

      }
    ];

    option = {
      tooltip: {
        show: true,
        position: 'top',
        formatter: function (params) {
          const indicesToShow = [0, 2, 4];
          if (indicesToShow.includes(params.dataIndex)) {
            return `${params.name}: ${params.value}`;
          }
          return null;
        },
      },
      series: [
        {
          type: 'gauge',
          startAngle: 90,
          endAngle: -270,
          radius: "100%",
          min: 0,
          max: this.responseData.data?.checkInsDto.totalCheckIns,
          pointer: {
            show: false
          },
          progress: {
            show: true,
            overlap: false,
            roundCap: true,
            clip: false,
            // itemStyle: {
            //   borderWidth: 1,
            //   borderColor: '#464646'
            // }
          },
          axisLine: {
            lineStyle: {
              width: 40,
            }
          },
          splitLine: {
            show: false,
            distance: 0,
            length: 10
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: false,
            distance: 50
          },
          data: gaugeData2,
          title: {
            show: false
          },
          detail: {
            show: false
          }
        }
      ],
      graphic: {
        tooltip: {
          show: true,
          formatter: `Total : ${this.responseData.data?.checkInsDto.totalCheckIns}`,
        },
        elements: [
          {
            type: 'text',
            left: 'center',
            top: '36%',
            style: {
              text: centralValue,
              fontSize: 36,
              fontWeight: 'bold',
              fill: '#000',
            }
          },
          {
            type: 'text',
            left: 'center',
            top: '55%',
            style: {
              text: subtitle,
              fontSize: 16,
              fill: '#aaa',
            }
          }
        ]
      }
    };

    // function updateGauge(newData) {
    //   gaugeData[0].value = newData[0];
    //   gaugeData[2].value = newData[1];
    //   gaugeData[4].value = newData[2];
    //   myChart.setOption({
    //     series: [
    //       {
    //         data: gaugeData
    //       }
    //     ]
    //   });
    // }


    option && this.checkInChart.setOption(option);
  }


  fetchPeakHours(): void {
    this.peakHourData = [];
    this.days = [];
    var index = 0;
    this.responseData.data?.parkingPeakHoursDto.listPeakHours.forEach((obj: any) => {
      
      this.days.push(obj.dayName);
      obj.listHourlyCount.forEach((dat: any) => {
        const tDataArray: any = [];
        tDataArray.push(index);
        tDataArray.push(dat.hour);
        tDataArray.push(dat.countOfHour);
        this.peakHourData.push(tDataArray);
      });
      index++;
    });
  }

  peakHoursGraph() {
    
    type EChartsOption = echarts.EChartsOption;
    var chartDom = document.getElementById('peakHoursGraph')!;
    var myChart = echarts.init(chartDom);
    var option: EChartsOption;

    const hours = [
      '0', '1', '2', '3', '4', '5', '6',
      '7', '8', '9', '10', '11',
      '12', '13', '14', '15', '16', '17',
      '18', '19', '20', '21', '22', '23',
    ];

    const days = this.days;

    const data = this.peakHourData.map(function (item) {
        return [item[1], item[0], item[2] || '-'];
      });

    option = {
      tooltip: {
        position: 'top',
      },
      grid: {
        height: '80%',
        width: '80%',
        top: '6%'
      },
      xAxis: {
        type: 'category',
        data: hours,
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: { show: true, margin: 20 },
        splitArea: {
          show: true
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: 'white',
            width: 3,
          }
        },


      },
      yAxis: {
        type: 'category',
        data: days,
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: { show: true, margin: 20 },
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
        max: 10,
        calculable: true,
        orient: 'horizontal',
        show: false,
        left: 'center',
        bottom: '100%',
        color: [
          '#45A5E2',
          '#1B7BB8',
          '#45A5E2',
          '#C0E2F7',
        ]
      },
      series: [
        {
          // name: 'Punch Card',
          type: 'heatmap',
          data: data,
          label: {
            show: true,
            fontSize: 11,
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
