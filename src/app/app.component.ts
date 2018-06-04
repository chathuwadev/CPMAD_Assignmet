import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import{ViewappointmentPage}from'../pages/viewappointment/viewappointment';
import { ListPage } from '../pages/list/list';
import { Login } from '../pages/login/login';
import * as firebase from 'firebase';
import { Push, PushObject, PushOptions } from '@ionic-native/push';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = Login;

  pages: Array<{title: string, component: any}>;


  config = {
  apiKey: "AIzaSyAfHCc-nn0mGNCL18ABU1DsmUy3Js9Akdg",
  authDomain: "salonapp-c2b18.firebaseapp.com",
  databaseURL: "https://salonapp-c2b18.firebaseio.com",
  projectId: "salonapp-c2b18",
  storageBucket: "salonapp-c2b18.appspot.com",
  messagingSenderId: "929506046363"
};


  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,private push: Push) {
    this.initializeApp();
    firebase.initializeApp(this.config);
    // used for an example of ngFor and navigation
   // this.pages = [
   //   { title: 'View Appointments', component: ViewappointmentPage },
      
   // ];
    
  }

  initializeApp() {
    this.platform.ready().then(() => {
      console.log("DDDD");
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.pushSetup();
    });
  }


  pushSetup(){
    const options: PushOptions = {
      android: {
        senderID:'929506046363'
      },
      ios: {
          alert: 'true',
          badge: true,
          sound: 'false'
      },
    
   };
   
   const pushObject: PushObject = this.push.init(options);
   console.log("DDDDDDD");
   
   pushObject.on('notification').subscribe((notification: any) => alert('Received a notification' + notification));
   
   pushObject.on('registration').subscribe((registration: any) => alert('Device registered' + registration));
   
   pushObject.on('error').subscribe(error => alert("Here : " + error));


  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
