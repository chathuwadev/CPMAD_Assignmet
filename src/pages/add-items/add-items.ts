import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database';

/**
 * Generated class for the AddItemsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-add-items',
  templateUrl: 'add-items.html',
})
export class AddItemsPage {

  public salonName:any;
  public sDetails:any;
  public sId:any;
  public type:any;
  public itemname:any;
  public itemprice:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,private _DB: DatabaseProvider) {

    this.salonName= localStorage.getItem('salonName');
    this.getSalonDetails();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddItemsPage');
  }


  getSalonDetails(){
    
        this._DB.getDocuments("Salon").then((data)=>{
          let result= data.filter(element=>{
            return(element.name==this.salonName);
    
          });
    
          this.sDetails=result;
          console.log(this.sDetails);
         
          this.sDetails.forEach(element => {
    
            this.sId=element.id;
            this.type=element.type
           
            
          });
        
    
        });
    
       
      }

      updateDetails(){
        this._DB.updateDocument("Salon",this.sId,{
         
          type:[{
            name:this.itemname,
            price:this.itemprice
          }]
           
    
         });
      
      }





}
