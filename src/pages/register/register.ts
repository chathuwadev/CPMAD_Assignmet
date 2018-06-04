import { Component } from '@angular/core';



import { NavController} from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database';
import { AlertController } from 'ionic-angular';
import{Login}from'../login/login';



@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class Register {

  name: any='';
  userid: any='';
  password: any='';
  password2: any='';
  email: any=''; 
  gender: any='';
  mobile:any='';
  salonName:any='';
  public check:any;
  public ck:any;

  constructor(public navCtrl: NavController,private _DB     : DatabaseProvider,public alertCtrl: AlertController) {
    

  }

  openPage(){
    //this.navCtrl.push(Login);
  }

    openPage2(){
    //this.navCtrl.push(Select2);
  }

    //onLoadSelect(){
      //this.navCtrl.push(Select);
    //}
 
    sNameCheck(){
      
      
          this._DB.getDocuments("User")
          .then((data) => {
            console.log(data);
      
           
      
      
      
            let result = data.filter(element => {
              return ( element.salonName ==this.salonName );
            });
            
            
            this.check = result;
            console.log("lalalalal");
           console.log(this.check.length);
           this.ck=this.check.length
          // if(this.appointment!=0){
           // console.log("hii");
           //}
      
      
            
          })
          .catch();
      
        }


    DataSent(){
  console.log(this.salonName)
      this._DB.addDocument("User",{
        name: this.name,
        userid:this.userid,
        password:this.password,
        email:this.email,
        mobile:this.mobile,
        salonName:this.salonName,
        role: "Owner"
      });
      this.clear();

    }

    showAlert() {
      let alert = this.alertCtrl.create({
        title: 'Please Fill Data!',
       
        buttons: ['OK']
      });
      alert.present();
    }

    clear(){
      this.name='',
      this.userid='',
      this.password='';
      this.password2='';
      this.gender='';
      this.email='';
  
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
              this.sNameCheck();
              console.log('Agree clicked');
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
              else if(this.mobile==''){
                this.showAlert();
              }
              else if(this.email==''){
                this.showAlert();
              }
              else if(this.salonName==''){
                this.showAlert();
              }
              else if(this.ck!=0){
                this.presentAlert1() ;
                this.salonName="";
              }
             
              else{
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
        title: 'Confirm password not match..',
       
        buttons: ['Dismiss']
      });
      alert.present();
    }

    presentAlert1() {
      let alert = this.alertCtrl.create({
        title: 'Salon Name is Exist...',
       
        buttons: ['Dismiss']
      });
      alert.present();
    }


}
