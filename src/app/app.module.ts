import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AgmCoreModule } from '@agm/core';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { DevicesComponent } from './sidenav-expanded/devices/devices.component';
import { LocationsComponent } from './sidenav-expanded/locations/locations.component';
import { EmptySidenavComponent } from './sidenav-expanded/empty-sidenav/empty-sidenav.component';
import {TokenInterceptorService } from '../app/services/InterceptorService/token-interceptor.service';
import { ModalModule} from 'ngx-bootstrap/modal';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LogsComponent } from './views/logs/logs.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { LocalComponent } from './local/local.component';
import { DashboardsComponent } from './sidenav-expanded/dashboards/dashboards.component';


@NgModule({
  declarations: [
    AppComponent,
    DevicesComponent,
    LogsComponent,
    LocationsComponent,
    EmptySidenavComponent,
    LogsComponent,
    LocalComponent,
    DashboardsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ToastrModule.forRoot(),
   
    FormsModule,
    BrowserAnimationsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCs1SGoWF9oLx-UPrnc6ZndAr_FjlksjeU'
    }),
    NgxPaginationModule,
    AgmCoreModule,
    NgxSpinnerModule,
    ModalModule.forRoot()

  ],
  providers: [
    // {
    //   provide:HTTP_INTERCEPTORS,
    //   useClass:TokenInterceptorService,
    //   multi:true
    // },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
