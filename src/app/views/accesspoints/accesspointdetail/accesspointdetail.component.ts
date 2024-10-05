import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-accesspointdetail',
  templateUrl: './accesspointdetail.component.html',
  styleUrls: ['./accesspointdetail.component.css']
})
export class AccesspointdetailComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  InDeviceDetailsControl = new FormControl([]);
  InDevices: string[] = ['DC-TNB2-GF','Device 2','Device 3'];

  onCatRemovedInDevices(cat: string) {
    
    const InDevices = this.InDeviceDetailsControl.value as string[];
    this.removeFirst(InDevices, cat);
    this.InDeviceDetailsControl.setValue(InDevices); // To trigger change detection
  }

  OutDeviceDetailsControl = new FormControl([]);
  OutDevices: string[] = ['Hik Vision','Device 2','Device 3'];

  onCatRemovedOutDevices(cat: string) {
    
    const OutDevices = this.OutDeviceDetailsControl.value as string[];
    this.removeFirst(OutDevices, cat);
    this.OutDeviceDetailsControl.setValue(OutDevices); // To trigger change detection
  }
  private removeFirst(array: any[], toRemove: any): void {

    const index = array.indexOf(toRemove);
    if (index !== -1) {
      array.splice(index, 1);
    }
  }

}
