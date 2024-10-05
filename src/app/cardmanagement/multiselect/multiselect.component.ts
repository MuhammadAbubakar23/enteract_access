import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, ElementRef, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { CardService} from '../../services/CardService/card.service'

@Component({
  selector: 'app-multiselect',
  templateUrl: './multiselect.component.html',
  styleUrls: ['./multiselect.component.css']
})
export class MultiselectComponent  {
  separatorKeysCodes: number[] = [ENTER, COMMA];
  locationCtrl = new FormControl('');
  filteredlocations: Observable<string[]>;
  locations = [];
  allLocation: string[] = ['Ibex1', 'Ibex2', 'Ibex10'];

  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;

  constructor( private cardService:CardService) {
    this.filteredlocations = this.locationCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => (fruit ? this._filter(fruit) : this. allLocation.slice())),
    );
  }



  getDevicesByLocation(){
    this.cardService.getDevicesByLocation(1).subscribe((Response:any)=>{
      this.locations=Response.data;
      console.log(Response.data);
     
  })
  }

  

  add(event: MatChipInputEvent): void {

   
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.locations.push(value);
      console.log(value);
      
     
    }

    // Clear the input value
    event.chipInput!.clear();

    this.locationCtrl.setValue(null);

    
  }

  remove(fruit: string): void {
    const index = this.locations.indexOf(fruit);

    if (index >= 0) {
      this.locations.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.locations.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.locationCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this. allLocation.filter(fruit => fruit.toLowerCase().includes(filterValue));
  }

}
