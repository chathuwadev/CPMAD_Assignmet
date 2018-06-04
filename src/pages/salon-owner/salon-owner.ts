import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController } from 'ionic-angular';
import{AppointmentviewPage}from'../appointmentview/appointmentview';
import{SalonregisterPage} from'../salonregister/salonregister';
import{ConfirmAppointmentsPage} from'../confirm-appointments/confirm-appointments'
import{Login}from'../login/login';
import{AddItemsPage} from'../add-items/add-items';

/**
 * Generated class for the SalonOwnerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-salon-owner',
  templateUrl: 'salon-owner.html',
})
export class SalonOwnerPage {

  public salonName:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,private modal:ModalController) {

    this.salonName= localStorage.getItem('salonName');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SalonOwnerPage');
  }


  openPage(){

this.navCtrl.push(AppointmentviewPage);
  }

  openPage2(){
    this.navCtrl.push(SalonregisterPage);
  }

  showConfirmAppointments(){
    this.navCtrl.push(ConfirmAppointmentsPage)
  //  let showConfirmAppointments=this.modal.create(ConfirmAppointmentsPage);
   //showConfirmAppointments.present();
  }

  logout(){
    this.navCtrl.push(Login);
    
  }

  addItems(){

    this.navCtrl.push(AddItemsPage);
  }
}
