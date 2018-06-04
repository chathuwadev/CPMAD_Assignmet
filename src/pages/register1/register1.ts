import { Component } from '@angular/core';
import { Register } from '../register/register';
import { Registercus } from '../registercus/registercus';



import { NavController } from 'ionic-angular';


@Component({
  selector: 'page-register1',
  templateUrl: 'register1.html'
})
export class Register1 {

  constructor(public navCtrl: NavController) {

  }

  openPage(){
    this.navCtrl.push(Register);
  }

    openPage2(){
    this.navCtrl.push(Registercus);
  }

    //onLoadSelect(){
      //this.navCtrl.push(Select);
    //}

}
