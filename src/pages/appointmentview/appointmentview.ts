import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database';
import { AlertController } from 'ionic-angular';
import{SalonOwnerPage}from'../salon-owner/salon-owner';
/**
 * Generated class for the AppointmentviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-appointmentview',
  templateUrl: 'appointmentview.html',
})
export class AppointmentviewPage {


  public appointment: any;

  public salonName:any;


  constructor(public navCtrl: NavController, public navParams: NavParams, private _DB: DatabaseProvider, public alertCtrl: AlertController) {
    this.loadAppointment();
    this.salonName= localStorage.getItem('salonName');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AppointmentviewPage');
  }

  loadAppointment() {
    this._DB.getDocuments("Appointment")
      .then((data) => {
        console.log(data);

        console.log(this.appointment);



        let result = data.filter(element => {
          return (element.dStatus == "F" && element.salonName ==this.salonName && element.cStatus == "F");
        });
        
        
       this.appointment = result;
       

        
      })
      .catch();



  }

  confirm(id) {

    this.showConfirm(id);
  }

  cancel(id) {
    this.showConfirm1(id);
    this.navCtrl.push(SalonOwnerPage);
    
  }

  showConfirm(id) {
    let confirm1 = this.alertCtrl.create({
      title: 'Confirm',
      message: 'Do you want Accept an Appointment?',
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
              cStatus: "T"
            });
            this.navCtrl.push(SalonOwnerPage);


          }
        }
      ]
    });
    confirm1.present();
  }


  showConfirm1(id) {
    let confirm1 = this.alertCtrl.create({
      title: 'Confrm',
      message: 'Do you want Cancel an Appointment?',
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



}
