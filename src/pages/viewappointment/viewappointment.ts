import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database';
import{HomePage} from'../home/home';

/**
 * Generated class for the ViewappointmentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-viewappointment',
  templateUrl: 'viewappointment.html',
})
export class ViewappointmentPage {

  public name:any;
  public appointment:any;
  public status='pending';
  public ss:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,private _DB: DatabaseProvider) {
    this.name= localStorage.getItem('name');
    console.log(this.name);
    this.appointmentStatus();
    
    console.log(this.status);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewappointmentPage');
  }


  appointmentStatus(){


    this._DB.getDocuments("Appointment")
    .then((data) => {
      console.log(data);
      let result = 
      data.filter(element => {
        return ( element.cname ==this.name && element.dStatus=='F');
      })
      .map( element => {  
        if(element.cStatus =="T"){
          element.cStatus = 'Confirm';  
        }
        else{
          element.cStatus = 'Pending';
        }
        
        return element;
      });
      this.appointment = result;
     console.log(this.appointment);
    })
    .catch();

  }


  close(){
    this.navCtrl.push(HomePage);
    
  }

  getColor(){
    //return this.
  }

}
