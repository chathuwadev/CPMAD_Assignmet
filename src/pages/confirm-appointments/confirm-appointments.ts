import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,} from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database';
import { AlertController } from 'ionic-angular';
import{SalonOwnerPage}from'../salon-owner/salon-owner';

/**
 * Generated class for the ConfirmAppointmentsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-confirm-appointments',
  templateUrl: 'confirm-appointments.html',
})
export class ConfirmAppointmentsPage {

  public salonName:any;
  public appointment:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,private _DB: DatabaseProvider, public alertCtrl: AlertController) {
    this.salonName= localStorage.getItem('salonName');
    this.loadAppointment();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfirmAppointmentsPage');
  }

  loadAppointment() {
    this._DB.getDocuments("Appointment")
      .then((data) => {
        console.log(data);

        console.log(this.appointment);



        let result = data.filter(element => {
          return (element.dStatus == "F" && element.salonName ==this.salonName && element.cStatus=="T");
        });
        
        
       this.appointment = result;
       console.log(this.appointment )
       

        
      })
      .catch();



  }

  close(id){
this.showConfirm(id);
console.log("sssssssssssssssss")
this.navCtrl.push(SalonOwnerPage);
  }

  showConfirm(id) {
    console.log(id);
    let confirm1 = this.alertCtrl.create({
      title: 'Confirm',
      message: 'Do you want Close an Appointment?',
      buttons: [
        {
          text: 'Disagree',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Agree',
          handler: () => {
            console.log('Agree clicked');
            console.log(id);
            this._DB.updateDocument("Appointment", id, {
              dStatus: "T"
            });
            this.navCtrl.push(SalonOwnerPage);

          }
        }
      ]
    });
    confirm1.present();
  }

  close1(){
    this.navCtrl.push(SalonOwnerPage);
  }


}
