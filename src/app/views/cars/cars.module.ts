import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarsComponent } from './cars/cars.component';
import { SharedModule } from 'src/app/layouts/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CarsRoutingModule } from './cars-routing.module';
import { AddCarComponent  } from './add-car/add-car.component';
import { HttpClientModule } from '@angular/common/http';
import { CarviewComponent } from './carview/carview.component';
import { UpdateCarComponent } from './update-car/update-car.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BulkUploadCarsComponent } from './bulk-upload-cars/bulk-upload-cars.component';



@NgModule({
  declarations: [
    CarsComponent,
    AddCarComponent,
    CarviewComponent,
    UpdateCarComponent,
    BulkUploadCarsComponent,
  ],
  imports: [
    CommonModule,
    CarsRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    NgxSpinnerModule,
    MatPaginatorModule
  ]
})
export class CarsModule { }
