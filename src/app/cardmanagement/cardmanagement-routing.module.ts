import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddcardComponent } from './addcard/addcard.component';
import { BulkuploadComponent } from './bulkupload/bulkupload.component';
import { EditcardComponent } from './editcard/editcard.component';
import { ListofcardsComponent } from './listofcards/listofcards.component';
import { AuthGuard } from '../services/authguard/auth.guard';

const routes: Routes = [
  { path: 'listofcards', component: ListofcardsComponent, canActivate:[AuthGuard] },
  { path: "addcard", component: AddcardComponent, canActivate:[AuthGuard] },
  { path: "editcard/:id", component: EditcardComponent, canActivate:[AuthGuard] },
  {path:"bulkupload",component:BulkuploadComponent , canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CardmanagementRoutingModule { }
