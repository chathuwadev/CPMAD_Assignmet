import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database';
import{ImagePicker}from '@ionic-native/image-picker';
import{ storage}from'firebase';
import{CameraPreview} from'@ionic-native/camera-preview';
import { SalonOwnerPage } from '../salon-owner/salon-owner';
declare var window;
/**
 * Generated class for the SalonregisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-salonregister',
  templateUrl: 'salonregister.html',
})
export class SalonregisterPage {
  salonId: string;

 public salonName: any;
 public sDetails: any;
 public address:any;
 public sId:any;
 type:any;
 path:string;
public itemname:any;
public itemprice:any;
public itemname1:any;
public itemprice1:any;
 public myVar=true;
  constructor(public loadingCtrl: LoadingController, public navCtrl: NavController, public navParams: NavParams,private _DB: DatabaseProvider,private picker:ImagePicker,private camera:CameraPreview) {
    this.salonName= localStorage.getItem('salonName');
    this.salonId= localStorage.getItem('salonId');
    this.getSalonDetails(); 
    console.log("elaaaaaaaaa");
    //console.log(this.address);
    this.path='assets/imgs/download.png';
    console.log(this.myVar);
    console.log("elaaaaaaaaa222");
    //this.checkT();
    
    //console.log(this.myVar);
    
    
  }

  takephoto(){}

  

  getFileContentAsBase64(path,callback){
    window.resolveLocalFileSystemURL(path, gotFile, fail);
            
    function fail(e) {
          alert('Cannot found requested file');
    }

    function gotFile(fileEntry) {
           fileEntry.file(function(file) {
              var reader = new FileReader();
              reader.onloadend = function(e) {
                   var content = this.result;
                   callback(content);
              };
              // The most important point, use the readAsDatURL Method from the file plugin
              reader.readAsDataURL(file);
           });
    }
}

  choosePicture(){
      let option={
        title:'Select Picture',
        message:'Select least one picture',
        maximumImagesCount:1,
        outType:0

      };
      this.picker.getPictures(option).then(results=>{
        for(var i=0;i<results.length;i++){
          this.path=results[i];
          let loading=this.loadingCtrl.create({
            content:'Uploading Photo...'
          });    
          loading.present();
          this.getFileContentAsBase64(this.path,function(base64Image){
            let test = "salon/"+localStorage.getItem('salonId');
          const picture=storage().ref(test);
          picture.putString(base64Image,'data_url').then(function(snapshot) {
            loading.dismiss();
          });
          
        });
        }
      },err=>{
        alert("Err"+err);
      })

  }

  storeImage(){
      //const image='data:image/jpeg;base64'+path;
      const picture=storage().ref('salon');
     // picture.putString(image,'data_url');
      alert("ok");
  }

  checkT(){
    if(this.address==""){
      this.myVar=false;
    }
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SalonregisterPage');
    
  }

  getSalonDetails(){

    this._DB.getDocuments("Salon").then((data)=>{
      let result= data.filter(element=>{
        if(element.name == this.salonName){
          localStorage.setItem('salonId',element.id );
        }
        return(element.name==this.salonName);

      });

      this.sDetails=result;
      console.log(this.sDetails);
      if(this.sDetails==""){
        this.myVar=false;
      }

      this.sDetails.forEach(element => {

        this.address=element.address;
        this.sId=element.id;

        this.type=element.type
        this.type.forEach(element=>{
          this.itemname=element.name;
          this.itemprice=element.price
        })
        
        
       
      });
      //this.checkT();
      console.log("elaaaaaaaa5");
      console.log(this.myVar);
  

    });

   
  }

  addSalonDetails(){

    this._DB.addDocument("Salon",{
      name:this.salonName,
      address:this.address,
      imageId:'',
      image:this.path,
      type:[{
        name:this.itemname,
        price:this.itemprice
      },{
        name:this.itemname1,
        price:this.itemprice1
      }]

    })


    alert("complete..");
    this.navCtrl.push(SalonOwnerPage);
  }

  updateImageURL(ID){
    this._DB.updateDocument("Salon",this.sId,{
      imageId: ID
     }
    );
  
  }

  updateDetails(){
    this._DB.updateDocument("Salon",this.sId,{
     address:this.address,
     image:this.path,
     type:[{
      name:this.itemname,
      price:this.itemprice
    },{
      name:this.itemname1,
      price:this.itemprice1
    }]
     
     //name:this.salonName
     //for(let i=0;){
       

     }
    

    );

    alert("complete..");
    this.navCtrl.push(SalonOwnerPage);
  
  }

}
