import { Component } from '@angular/core';
import { Register } from '../register/register';
import { DatabaseProvider } from '../../providers/database';
import { AlertController } from 'ionic-angular';
import{Login}from'../login/login';


import { NavController} from 'ionic-angular';


@Component({
  selector: 'page-registercus',
  templateUrl: 'registercus.html'
})
export class Registercus {

  name: any='';
  userid: any='';
  password: any='';
  password2: any='';
  gender: any='';
  contact: any='';

  constructor(public navCtrl: NavController,private _DB     : DatabaseProvider,public alertCtrl: AlertController) {
    
  }

  openPage(){
    this.navCtrl.push(Register);
  }

    openPage2(){
    //this.navCtrl.push(Select2);
  }

  DataSent(){

   

  this._DB.addDocument("User",{
    name: this.name,
    userid:this.userid,
    password:this.password,
    gender:this.gender,
    contact:this.contact,
    role: "customer"
  });
  this.clear();

 
  }

  clear(){
    this.name='',
    this.userid='',
    this.password='';
    this.password2='';
    this.gender='';
    this.contact='';

  }


  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Please Fill Data!',
     
      buttons: ['OK']
    });
    alert.present();
  }


  showConfirm() {
    let confirm1 = this.alertCtrl.create({
      title: 'Confirm',
      message: 'Do you want create an Account?',
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

            if(this.userid=='' ){
              this.showAlert();
            }
            else if(this.name==''){
              this.showAlert();
            }
            else if(this.password==''){
              this.showAlert();
            }
            else if(this.password2==''){
              this.showAlert();
            }
            else if(this.password!=this.password2){
                this.presentAlert();
                this.password2='';
            }
            else if(this.gender==''){
              this.showAlert();
            }
            else if(this.contact==''){
              this.showAlert();
            }
            else{ 
              console.log('Agree clicked');
              this.DataSent();
              this.navCtrl.push(Login);
      
            }
            
          }
        }
      ]
    });
    confirm1.present();
  }


  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'confirm password not',
     
      buttons: ['Dismiss']
    });
    alert.present();
  }

  
}
