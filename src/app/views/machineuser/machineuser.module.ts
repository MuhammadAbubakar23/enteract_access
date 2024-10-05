import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MachineuserRoutingModule } from './machineuser-routing.module';
import { CreatemachineuserComponent } from './createmachineuser/createmachineuser.component';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListofmachineusersComponent } from './listofmachineusers/listofmachineusers.component';
import { EditmachineuserComponent } from './editmachineuser/editmachineuser.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { BulkuploadComponent } from './bulkupload/bulkupload.component';
import { UserdetailComponent } from './userdetail/userdetail.component';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MachineformComponent } from './machineform/machineform.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DatePipe } from '@angular/common'; 


@NgModule({
  declarations: [
    CreatemachineuserComponent,
    ListofmachineusersComponent,
    EditmachineuserComponent,
    BulkuploadComponent,
    UserdetailComponent,
    MachineformComponent
  ],
  imports: [
    CommonModule,
    MachineuserRoutingModule,
    FilterPipeModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
      MatIconModule,
      MatSelectModule,
      MatChipsModule,
      NgxSpinnerModule,
      MatAutocompleteModule,
      MatChipsModule,
      MatFormFieldModule,
      MatIconModule,
      MatInputModule
  ],
  providers: [DatePipe],
})
export class MachineuserModule { }
