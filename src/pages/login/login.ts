import { Component } from '@angular/core';

//import { NavController } from 'ionic-angular';
import { NavController,LoadingController,NavParams } from 'ionic-angular';
//import {Select } from "../select/select";
//import {Select2 } from "../select2/select2";
import { HomePage } from '../home/home';
import {Register1} from "../register1/register1";
import { DatabaseProvider } from '../../providers/database';
import{SalonOwnerPage}from'../salon-owner/salon-owner';
//import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class Login {

  public userData:any;
  usernameField:any;
  public adminUser:any;
  public passwordField:any;
  

  constructor(public navCtrl: NavController,private _DB     : DatabaseProvider, public loadingCtrl: LoadingController,public navParams: NavParams,public alertCtrl: AlertController) {
   
    }

    showAlert() {
      let alert = this.alertCtrl.create({
        title: 'Invalid Username or Password....!',
       
        buttons: ['OK']
      });
      alert.present();
    }
    

  openPage(){

let loading=this.loadingCtrl.create({
  content:'Please wait...'
});    
loading.present();
   
    this._DB.getDocuments("User")
    .then((data) =>
    {
      
        this.userData=data;
      // console.log(data);
       
       
       let result = data.filter(element => {
         return (element.userid==this.usernameField && element.password==this.passwordField); 
       })

       
      // this.navParams.
       
       if(result.length > 0){
         let element = result.pop();
         console.log(element.name);
          if(element.role=="customer"){
              if(this.usernameField==''){
                loading.dismiss();
              }else{

                localStorage.setItem('name',element.name );
                localStorage.setItem('contact',element.contact );
                
                            this.navCtrl.push(HomePage,{
                              user:element.name
                              
                              
                            });
                            loading.dismiss();
                            this.clear();
                
              }
           
          }
          else if(element.role=="Owner"){
            localStorage.setItem('salonName',element.salonName );
            if(this.usernameField==''){
              loading.dismiss();
            }
            else{
              this.navCtrl.push(SalonOwnerPage);
              loading.dismiss();
              this.clear();
            }
            
          }
       }
       else{
        loading.dismiss();
        this.showAlert();
        this.usernameField='';
        this.passwordField='';
       }


    })
    .catch();

  }

    openPage2(){

    this.navCtrl.push(Register1);
  }

  clear(){
    this.usernameField="";
    this.passwordField="";
  }

    //onLoadSelect(){
      //this.navCtrl.push(Select);
    //}

}
