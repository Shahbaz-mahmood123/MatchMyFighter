import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';

import { UserProvider } from '../../providers/user/user';
import { ProfilePage } from '../profile/profile';
import { ProfilepicPage } from '../profilepic/profilepic';
import { FighterdetailsPage } from '../fighterdetails/fighterdetails';
/**
 * Generated class for the SignupPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  newuser = {
    email: '',
    password: '',
    displayName: '',
    age: '',
    fights: '',
    titles: [''],
    usertype: '',
    info: '',
    gym: '',
    events: '',
    contact: '',
  }
  constructor(public navCtrl: NavController, public navParams: NavParams, public userservice: UserProvider,
              public loadingCtrl: LoadingController, public toastCtrl: ToastController) {
  }
 
  signup() {
    var toaster = this.toastCtrl.create({
      duration: 3000,
      position: 'bottom'
    });
    if (this.newuser.email == '' || this.newuser.password == '' || this.newuser.displayName == '') {
      toaster.setMessage('All fields are required');
      toaster.present();
    }
    else if (this.newuser.password.length < 7) {
      toaster.setMessage('Password is not strong. Try giving more than six characters');
      toaster.present();
    }
    else {
      let loader = this.loadingCtrl.create({
        content: 'Please wait',
        duration: 3000
        
      });
      loader.present();
      this.userservice.adduser(this.newuser).then((res: any) => {
        loader.dismiss();
        if (res.success)
          this.navCtrl.push(ProfilepicPage);
        else
          alert('Error' + res);
      })
    }
  }  
 
  goback() {
    this.navCtrl.setRoot('LoginPage');
  }
 
}