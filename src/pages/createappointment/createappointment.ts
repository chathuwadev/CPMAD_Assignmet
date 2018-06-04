import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import{HomePage} from'../home/home';
import{DatabaseProvider} from'../../providers/database';
import { AlertController } from 'ionic-angular';




/**
 * Generated class for the CreateappointmentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-createappointment',
  templateUrl: 'createappointment.html',
})
export class CreateappointmentPage {

  public apointment={};
  public add=[];
  public totalCost = 0;
  public totalList = "";
  public  sname:string;

  requirment: any='';
  myDate: any='';
  salonName:any;
  mySelect:any ='';
  userN:any;
  cStatus:any;
  dStatus:any;
  contact:any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams,private db:DatabaseProvider,public alertCtrl: AlertController) {
    this.apointment=this.navParams.get("Appointment");
    //this.userN= this.navParams.get("userN2");
    this.userN= localStorage.getItem('name');
    this.salonName= localStorage.getItem('salonname');
    this.contact=localStorage.getItem('contact')
  }

  showAlert1() {
    let alert = this.alertCtrl.create({
      title: 'Please Fill Date.!',
     
      buttons: ['OK']
    });
    alert.present();
  }
  showAlert2() {
    let alert = this.alertCtrl.create({
      title: 'Please Fill Your Requirment.!',
     
      buttons: ['OK']
    });
    alert.present();
  }

 

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateappointmentPage');
  }
  cancel(){

    this.navCtrl.push(HomePage);
  }

  onChange(mySelect){
    this.totalCost = 0;
    
    mySelect.forEach(item => {
      this.totalCost += parseFloat(item.price);
      this.totalList = this.totalList + item.name +",";
    });

  }

  confirm(){
    this.db.addDocument('Appointment',{
     // sname:this.salonName,
      salonName:this.salonName ,
      cname:this.userN,
      contact:this.contact,
      requirment:this.totalList,
      myDate:this.myDate,
      totalCost:this.totalCost,
      cStatus:'F',
      dStatus:'F'

      


    });

  }

  showConfirm() {
    let confirm1 = this.alertCtrl.create({
      title: 'Confrm',
      message: 'Do you want create an Appointment?',
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
            if(this.mySelect==''){
              this.showAlert2();
            }else if(this.myDate==''){
              this.showAlert1();
            }
            else{
              this.confirm();
              this.navCtrl.push(HomePage);
      
            }
            
          }
        }
      ]
    });
    confirm1.present();
  }




}
