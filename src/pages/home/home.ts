import { Component } from '@angular/core';
//import { Login } from '../login/login';

//import { NavController } from 'ionic-angular';
import { NavController,NavParams,ModalController} from 'ionic-angular';
//import {Select } from "../select/select";
//import {Select2 } from "../select2/select2";
import{SalondetailsPage}from'../salondetails/salondetails';
import { DatabaseProvider } from '../../providers/database';
//import { Storage } from '@ionic/storage';
import{ViewappointmentPage} from'../viewappointment/viewappointment';
import{Login}from'../login/login'
import{ storage}from'firebase';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public salon: any;
  public userN:any

  constructor(public navCtrl: NavController,private _DB     : DatabaseProvider,public navParams: NavParams,private modal:ModalController) {
    this.loadSalon();
  // this.userN= this.navParams.get("user");
   //console.log(this.userN)
  this.userN= localStorage.getItem('name');
  console.log(this.userN);
  }







  loadSalon(){
    

    this._DB.getDocuments("Salon")
    .then((data) =>
    {
      console.log(data);
      this.salon=data;

      this.salon.map(temp => {
        storage().ref().child(`salon/${temp.id}`).getDownloadURL()
        .then(url=>{
          temp.image = url;  
        })
        .catch(function(error) {});
        console.log(temp);
        return temp;
      })
       console.log(this.salon);
    })
    .catch();

    
  }

  openPage(){
    this.navCtrl.push(ViewappointmentPage);
  }

  gotoSalondetailsPage(salon1){

    this.navCtrl.push(SalondetailsPage,{SalonDetails:salon1,userN1:this.userN});
  }


  showAppointments(){
    let showAppointments= this.modal.create(ViewappointmentPage);
    showAppointments.present();

  }


    //onLoadSelect(){
      //this.navCtrl.push(Select);
    //}


    logout(){
      this.navCtrl.push(Login);
    }

}
