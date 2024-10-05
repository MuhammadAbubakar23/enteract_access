import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { RightbarComponent } from './components/rightbar/rightbar.component';
import { GooglemapsComponent } from './components/googlemaps/googlemaps.component';
import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';



@NgModule({
  declarations: [
    SidenavComponent,
    HeaderComponent,
    FooterComponent,
    RightbarComponent,
    GooglemapsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    AgmCoreModule
  ],
  exports:[
    SidenavComponent,
    HeaderComponent,
    RightbarComponent,
    GooglemapsComponent
    
  ]
})
export class SharedModule { }
