import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CarsComponent } from "./cars/cars.component";
import { AddCarComponent  } from "./add-car/add-car.component";
import { CarviewComponent } from "./carview/carview.component";
import { UpdateCarComponent } from "./update-car/update-car.component";
import { BulkUploadCarsComponent } from "./bulk-upload-cars/bulk-upload-cars.component";

const routes: Routes = [

    { path: "", component: CarsComponent  },
    { path: "add-car", component: AddCarComponent },
    { path: "carview/:id", component: CarviewComponent },
    { path: "updatecar/:id", component: UpdateCarComponent },
    { path: "carBulkUpload", component: BulkUploadCarsComponent },
  ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule,]
  })
  export class CarsRoutingModule {}