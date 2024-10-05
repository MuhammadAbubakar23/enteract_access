import { Component, OnInit } from '@angular/core';
import { DatashareService } from 'src/app/services/datashareservice/datashare.service';
import * as echarts from 'echarts';
import { title } from 'process';
import { NgxSpinnerService } from 'ngx-spinner';
import { DevicesDashboardService } from 'src/app/services/devices-dashboard-service/devices-dashboard.service';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})
export class DevicesComponent implements OnInit {

  accessTotalOnline: any = 0;
  accessTotalOffline: any = 0;
  biometricTotalOnline: any = 0;
  biometricTotalOffline: any = 0;
  accessGroupDevices: any[] = [];
  bioGroupDevices: any[] = [];
  total: any = {};
  total2: any = {};
  accessGraphData: any[] = [];
  biometricGraphData: any[] = [];
  data1: any = {};
  accesshvThumb: number = 0;
  accesshvFace: number = 0;
  accesshvCard: number = 0;
  accesszkThumb: number = 0;
  accesszkFace: number = 0;
  accesszkCard: number = 0;

  biohvThumb: number = 0;
  biohvFace: number = 0;
  biohvCard: number = 0;
  biozkThumb: number = 0;
  biozkFace: number = 0;
  biozkCard: number = 0;

  message: any = {
    title: "Dashboard",
    Icon: "fal fa-gauge",
    subTitle: "",
    Url: "/dashboard/dashboards/executive",
    subTabs: [
      { name: "Executive", url: "/dashboard/dashboards/executive", isActive: false },
      { name: "Vehicles", url: "/dashboard/dashboards/vehicles", isActive: false },
      { name: "Devices", url: "/dashboard/dashboards/devices", isActive: true }
    ]
  };


  constructor(private sharedata: DatashareService, private SpinnerService: NgxSpinnerService, private devicesService: DevicesDashboardService) { }

  ngOnInit(): void {
    this.sharedata.sendMessage(this.message);
    this.getDevices();
  }


  getDevices() {
    
    this.devicesService.getDevicesData().subscribe((resp: any) => {
      
      this.data1 = resp;
      this.fetchData();
    });
  }

  fetchData() {
    
    this.data1.data.listGroupedDevices.forEach(group => {
      if (group.deviceGroupName === 'Access Devices') {
        this.accessGroupDevices.push(group);
      } else if (group.deviceGroupName === 'Biometric Devices') {
        this.bioGroupDevices.push(group);
      };
    });

    console.log('Access Group Devices:', this.accessGroupDevices);
    console.log('Bio Group Devices:', this.bioGroupDevices);

    
    this.accessGroupDevices.forEach(item => {
      
      this.accessTotalOnline = this.accessTotalOnline + item.totalOnlineInGroup;
      this.accessTotalOffline = this.accessTotalOffline + item.totalOfflineInGroup;

      console.log('total online in access:', this.accessTotalOnline);
      console.log('total ofline in access:', this.accessTotalOffline);
    });


    this.bioGroupDevices.forEach(item1 => {
      
      this.biometricTotalOnline = this.biometricTotalOnline + item1.totalOnlineInGroup;
      this.biometricTotalOffline = this.biometricTotalOffline + item1.totalOfflineInGroup;

      console.log('total online in biometric:', this.biometricTotalOnline);
      console.log('total ofline in biometric:', this.biometricTotalOffline);
    });

    
    this.total = {
      number: this.accessTotalOnline + this.accessTotalOffline,
      subtitle: "Devices",
    }

    this.accessGraphData = [
      { value: this.accessTotalOnline, name: 'Online' },
      { value: this.accessTotalOffline, name: 'Offline' },
    ];

    this.total2 = {
      number: this.biometricTotalOnline + this.biometricTotalOffline,
      subtitle: "Devices",
    }
    this.biometricGraphData = [
      { value: this.biometricTotalOnline, name: 'Online' },
      { value: this.biometricTotalOffline, name: 'Offline' },
    ];

    const accessDevices = this.data1.data.listGroupedDevices.filter(group => group.deviceGroupName === 'Access Devices');
    const biometricDevices = this.data1.data.listGroupedDevices.filter(group => group.deviceGroupName === 'Biometric Devices');
    
    const sumDevices = (devices, make, readerType) => {
      
      return devices.reduce((sum, group) => {
        const makeWiseDevices = group.listGroupedDevicesMakeWise.filter(deviceMake => deviceMake.makeName === make && deviceMake.readerType === readerType);
        return sum + makeWiseDevices.reduce((makeSum, deviceMake) => makeSum + deviceMake.totalDevicesInReadType, 0);
      }, 0);
    };
    
    this.accesshvThumb = sumDevices(accessDevices, 'HikVision', 'Thumb');
    this.accesshvFace = sumDevices(accessDevices, 'HikVision', 'Face');
    this.accesshvCard = sumDevices(accessDevices, 'HikVision', 'RFID');
    
    this.accesszkThumb = sumDevices(accessDevices, 'ZK', 'Thumb');
    this.accesszkFace = sumDevices(accessDevices, 'ZK', 'Face');
    this.accesszkCard = sumDevices(accessDevices, 'ZK', 'RFID');
    
    this.biohvThumb = sumDevices(biometricDevices, 'HikVision', 'Thumb');
    this.biohvFace = sumDevices(biometricDevices, 'HikVision', 'Face');
    this.biohvCard = sumDevices(biometricDevices, 'HikVision', 'RFID');
    
    this.biozkThumb = sumDevices(biometricDevices, 'ZK', 'Thumb');
    this.biozkFace = sumDevices(biometricDevices, 'ZK', 'Face');
    this.biozkCard = sumDevices(biometricDevices, 'ZK', 'RFID');
    
    
    console.log("accesshvThumb " + this.accesshvThumb);
    console.log("accesshvFace " + this.accesshvFace);
    console.log("accesshvCard " + this.accesshvCard);
    console.log("accesszkThumb " + this.accesszkThumb);
    console.log("accesszkFace " + this.accesszkFace);
    console.log("accesszkCard " + this.accesszkCard);
    console.log("biohvThumb " + this.biohvThumb);
    console.log("biohvFace " + this.biohvFace);
    console.log("biohvCard " + this.biohvCard);
    console.log("biozkThumb " + this.biozkThumb);
    console.log("biozkFace " + this.biozkFace);
    console.log("biozkCard " + this.biozkCard);

    this.accessGraph();
    this.biometricGraph();

  };


  accessGraph() {
    
    var chartDom = document.getElementById('accessGraph');
    var myChart = echarts.init(chartDom);
    var option;

    option = {

      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c}'
      },
      legend: {
        bottom: '5%',
        center: 'center',
        icon: 'circle',
        formatter: function (name) {
          const dataItem = option.series[0].data.find(item => item.name === name);
          return `${name}: ${dataItem.value}`;
        }
      },
      series: [
        {
          // name: 'Access Graph',
          type: 'pie',
          radius: ['40%', '55%'],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: 'center',
            // formatter: function(){ 
            //   if(option.series[0].emphasis.label.show === false){
            //     return this.total;
            //   }
            // },
            // formatter: function (){ return this.total;},
            formatter: () => {
              return `{total|${this.total.number}}\n{subtitle|${this.total.subtitle}}`;
            },
            rich: {
              total: {
                fontSize: 32,
                fontWeight: 'bold'
              },
              subtitle: {
                fontSize: 18,
                color: '#999'
              }
            }
            // formatter: () => {this.total.number; this.total.subtitle.toString(); },
            // formatter: () => {
            //   return this.total;
            // },
            // fontSize: 40,
            // fontWeight: 'bold'
          },
          emphasis: {
            label: {
              show: false,
              fontSize: 40,
              fontWeight: 'bold',
              // formatter: '{b}: {c}'
            }
          },
          labelLine: {
            show: false
          },
          color:
            [
              //green
              '#3CC480',
              //red
              '#FF6867',
            ],
          data: this.accessGraphData
        }
      ],
      graphic: {
        tooltip: {
          show: true,
          formatter: `Total : ${this.total.number}`,
        },
        elements: [
          {
            type: 'text',
            left: 'center',
            top: '42%',
            style: {
              text: this.total.number,
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
              text: this.total.subtitle,
              fontSize: 16,
              fill: '#aaa',
            }
          }
        ]
      }
    };

    option && myChart.setOption(option);
  }

  biometricGraph() {
    var chartDom = document.getElementById('biometricGraph');
    var myChart = echarts.init(chartDom);
    var option;

    option = {

      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c}'
      },
      legend: {
        bottom: '5%',
        center: 'center',
        icon: 'circle',
        formatter: function (name) {
          const dataItem = option.series[0].data.find(item => item.name === name);
          return `${name}: ${dataItem.value}`;
        }
      },
      series: [
        {
          // name: 'Access Graph',
          type: 'pie',
          radius: ['40%', '55%'],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: 'center',
            // formatter: function(){ 
            //   if(option.series[0].emphasis.label.show === false){
            //     return this.total;
            //   }
            // },
            // formatter: function (){ return this.total;},
            formatter: () => {
              return `{total|${this.total2.number}}\n{subtitle|${this.total2.subtitle}}`;
            },
            rich: {
              total: {
                fontSize: 32,
                fontWeight: 'bold'
              },
              subtitle: {
                fontSize: 18,
                color: '#999'
              }
            }            // formatter: () => {
            //   return this.total;
            // },
            // fontSize: 40,
            // fontWeight: 'bold'
          },
          emphasis: {
            label: {
              show: false,
              fontSize: 40,
              fontWeight: 'bold',
              // formatter: '{b}: {c}'
            }
          },
          labelLine: {
            show: false
          },
          color:
            [
              //green
              '#3CC480',
              //red
              '#FF6867',
            ],
          data: this.biometricGraphData
        }
      ],
      graphic: {
        tooltip: {
          show: true,
          formatter: `Total : ${this.total2.number}`,
        },
        elements: [
          {
            type: 'text',
            left: 'center',
            top: '42%',
            style: {
              text: this.total2.number,
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
              text: this.total2.subtitle,
              fontSize: 16,
              fill: '#aaa',
            }
          }
        ]
      }
    };

    option && myChart.setOption(option);
  }

}
