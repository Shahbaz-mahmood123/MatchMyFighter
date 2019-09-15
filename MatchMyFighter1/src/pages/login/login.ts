import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AuthProvider } from '../../providers/auth/auth';


import { usercreds } from '../../models/interfaces/usercred';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  credentials = {} as usercreds;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public authservice: AuthProvider) {
  }
 
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
 
  signin() {
    this.authservice.login(this.credentials).then((res: any) => {
      if (!res.code)
        this.navCtrl.setRoot('TabsPage');
      else
        alert(res);
    })
  }
 
  passwordreset() {
    this.navCtrl.push('PasswordresetPage');  
  }
   
coachpromoter(){
  this.navCtrl.push('Coach-PromoterPage')
}
signup() {
    this.navCtrl.push('SignupPage');
  }
}
