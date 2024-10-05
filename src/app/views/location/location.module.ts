import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LocationRoutingModule } from './location-routing.module';
import { ListoflocationsComponent } from './listoflocations/listoflocations.component';
import { CreatelocationComponent } from './createlocation/createlocation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/layouts/shared/shared.module';
import { RouterModule } from '@angular/router';
import { EditlocationComponent } from './editlocation/editlocation.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { LocationdetailComponent } from './locationdetail/locationdetail.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LocationformComponent } from './locationform/locationform.component';


@NgModule({
  declarations: [
    ListoflocationsComponent,
    CreatelocationComponent,
    EditlocationComponent,
    LocationdetailComponent,
    LocationformComponent
  ],
  imports: [
    CommonModule,
    LocationRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule,
    NgxPaginationModule,
    MatChipsModule,
    MatIconModule,
    MatSelectModule,
    NgxSpinnerModule
  ]
})
export class LocationModule { }
