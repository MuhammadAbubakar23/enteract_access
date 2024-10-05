import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardmanagementRoutingModule } from './cardmanagement-routing.module';
import { ListofcardsComponent } from './listofcards/listofcards.component';
import { AddcardComponent } from './addcard/addcard.component';
import { EditcardComponent } from './editcard/editcard.component';
import { CardformComponent } from './cardform/cardform.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { BulkuploadComponent } from './bulkupload/bulkupload.component';
import { MultiselectComponent } from './multiselect/multiselect.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';

import {MatSlideToggleModule} from '@angular/material/slide-toggle';

@NgModule({
  declarations: [
    ListofcardsComponent,
    AddcardComponent,
    EditcardComponent,
    CardformComponent,
    BulkuploadComponent,
    MultiselectComponent
  ],
  imports: [
    CommonModule,
    CardmanagementRoutingModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    FormsModule,  
    NgxPaginationModule,
    MatSelectModule,
    MatChipsModule,
    MatIconModule,
    NgxSpinnerModule,
    MatAutocompleteModule,
    MatSlideToggleModule
  ]
})
export class CardmanagementModule { }
