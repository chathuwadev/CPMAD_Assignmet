import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { Login } from '../pages/login/login';
import { Register } from '../pages/register/register';
import { Register1 } from '../pages/register1/register1';
import { Registercus } from '../pages/registercus/registercus';
import{SalondetailsPage} from '../pages/salondetails/salondetails';
import{CreateappointmentPage} from'../pages/createappointment/createappointment';
import{SalonOwnerPage} from'../pages/salon-owner/salon-owner';
import{AppointmentviewPage} from'../pages/appointmentview/appointmentview';
import{SalonregisterPage} from'../pages/salonregister/salonregister';
import{ViewappointmentPage} from'../pages/viewappointment/viewappointment';
import{ConfirmAppointmentsPage} from'../pages/confirm-appointments/confirm-appointments';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DatabaseProvider } from '../providers/database';
import { HttpClient, HttpHandler, HttpClientModule } from '@angular/common/http';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import{ImagePicker}from '@ionic-native/image-picker';
import{CameraPreview} from'@ionic-native/camera-preview';
import{AddItemsPage}from'../pages/add-items/add-items';

var config = {
  apiKey: "AIzaSyAfHCc-nn0mGNCL18ABU1DsmUy3Js9Akdg",
  authDomain: "salonapp-c2b18.firebaseapp.com",
  databaseURL: "https://salonapp-c2b18.firebaseio.com",
  projectId: "salonapp-c2b18",
  storageBucket: "salonapp-c2b18.appspot.com",
  messagingSenderId: "929506046363"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    Login,
    Register,
    Register1,
    Registercus,
    SalondetailsPage,
    CreateappointmentPage,
    SalonOwnerPage,
    AppointmentviewPage,
    SalonregisterPage,
    ViewappointmentPage,
    ConfirmAppointmentsPage,
    AddItemsPage
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    Login,
    Register,
    Register1,
    Registercus,
    SalondetailsPage,
    CreateappointmentPage,
    SalonOwnerPage,
    AppointmentviewPage,
    SalonregisterPage,
    ViewappointmentPage,
    ConfirmAppointmentsPage,
    AddItemsPage
  ],
  providers: [
    StatusBar,
    HttpClient,
    DatabaseProvider, 
    SplashScreen,
    Push,
    ImagePicker,
    CameraPreview,
    {provide: ErrorHandler, useClass: IonicErrorHandler}  ]
})
export class AppModule {}
