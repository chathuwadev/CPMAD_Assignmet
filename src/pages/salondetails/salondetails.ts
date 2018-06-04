import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import{CreateappointmentPage}from'../createappointment/createappointment';

/**
 * Generated class for the SalondetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-salondetails',
  templateUrl: 'salondetails.html',
})
export class SalondetailsPage {

 public salonDetails:any;
 public userN1:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {

this.salonDetails=this.navParams.get("SalonDetails");
this.userN1=this.navParams.get("userN1")
console.log('patta');
console.log(this.userN1)

localStorage.setItem('salonname',this.salonDetails.name );
  }

  

  ionViewDidLoad() {
    console.log('ionViewDidLoad SalondetailsPage');
  }


  gotoAppointmentPage(salonDetails){
    this.navCtrl.push(CreateappointmentPage,{
      Appointment:salonDetails,
      userN2:this.userN1
    });

  }
}
