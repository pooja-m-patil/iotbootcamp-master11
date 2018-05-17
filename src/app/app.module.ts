import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BlueColorDirective } from './blue-color.directive';
import { RouterModule, Routes} from '@angular/router';
import { LoginFormComponent } from './login-form/login-form.component';
import { FooterComponent } from './footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserService } from './user.service';
import {AuthguardGuard} from './authguard.guard';
import { HttpModule } from '@angular/http';
import { RetrivedataComponent } from './retrivedata/retrivedata.component';
import { AddDeviceComponent } from './add-device/add-device.component';
import { ChartsModule } from 'ng2-charts';
import { GraphComponent } from './graph/graph.component';
import { FeaturesComponent } from './features/features.component';
import { FetchdataComponent } from './fetchdata/fetchdata.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { DeviceDiscoveryComponent } from './device-discovery/device-discovery.component';
import { DataService } from './data.service';


//import {AppRoutingModule} from './app-routing.module';
//import { Model } from './model';

const appRoutes:Routes=[
  {
    path:'',
    component:LoginFormComponent
  },
  // { path: '', redirectTo: '/app-login-form', pathMatch: 'full' },
  {
      path:'dashboard',
      //canActivate:[AuthguardGuard],
      component:DashboardComponent
  },
  {
    path:'fetchdata',
    //canActivate:[AuthguardGuard],
    component:FetchdataComponent
},
{
  path:'add-device',
  //canActivate:[AuthguardGuard],
  component:AddDeviceComponent
},
{
  path:'graph',
  //canActivate:[AuthguardGuard],
  component:GraphComponent
},
{
  path:'features',
  //canActivate:[AuthguardGuard],
  component:FeaturesComponent
},
  {
    path:'retrivedata',
    //canActivate:[AuthguardGuard],
    component:RetrivedataComponent
},
{
  path:'devicediscovery',
  //canActivate:[AuthguardGuard],
  component:DeviceDiscoveryComponent
}

]


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BlueColorDirective,
    LoginFormComponent,
    FooterComponent,
    DashboardComponent,
    RetrivedataComponent,
    AddDeviceComponent,
    GraphComponent,
    FeaturesComponent,
    FetchdataComponent,
    DeviceDiscoveryComponent,
    
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    //RouterModule.forRoot(dashRoutes),
    BrowserModule,
    FormsModule,
    HttpModule,
    ChartsModule,
    NgMultiSelectDropDownModule.forRoot()
    //AppRoutingModule
  ],
  providers: [UserService,AuthguardGuard,DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
