
import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-googlemaps',
  templateUrl: './googlemaps.component.html',
  styleUrls: ['./googlemaps.component.css']
})
export class GooglemapsComponent implements OnInit {

  lat = 30.3753;
  lng = 69.3451;
  mapType = 'terrain';
  @Output() newItemEvent = new EventEmitter<string>();

   // google maps zoom level
   zoom: number = 5;
  
   // initial center position for the map
  //  lat: number = 51.673858;
  //  lng: number = 7.815982;
 
   clickedMarker(label: string, index: string) {
     console.log(`clicked the marker: ${label || index}`)
   }
   
   mapClicked($event:any= MouseEvent) {
     this.markers.push({
       lat: $event.coords.lat,
       lng: $event.coords.lng,
       draggable: true
     });
   }
   
   markerDragEnd(m: marker, $event: MouseEvent) {
     console.log('dragEnd', m, $event);
   }
   
   markers: marker[] = [
     {
       lat: 51.673858,
       lng: 7.815982,
       label: 'A',
       draggable: true
     },
     {
       lat: 51.373858,
       lng: 7.215982,
       label: 'B',
       draggable: false
     },
     {
       lat: 51.723858,
       lng: 7.895982,
       label: 'C',
       draggable: true
     }
   ]

  constructor() { }

  ngOnInit(): void {
  }


  onMapClicked(event:any){
    this.lat=event.coords.lat
    this.lng=event.coords.lng
    this.newItemEvent.emit(event);    
   }

}
// just an interface for type safety.
interface marker {
	lat: number;
	lng: number;
	label?: string;
	draggable: boolean;
}