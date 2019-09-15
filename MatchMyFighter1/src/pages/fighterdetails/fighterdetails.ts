import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { Profile} from '../../models/interfaces/profile';
import{AngularFireDatabase} from 'angularfire2/database';
import 'rxjs/add/operator/take';
import { ProfilePage } from '../profile/profile';
import { ProfilepicPage } from '../profilepic/profilepic';
/**
 * Generated class for the FighterdetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-fighterdetails',
  templateUrl: 'fighterdetails.html',
})
export class FighterdetailsPage {

  profile = {} as Profile;
  
  constructor(private afAuth:AngularFireAuth, private afDatabase: AngularFireDatabase, 
    public navCtrl: NavController, public navParams: NavParams,  ) {
  }
  // selectChangeHandler(event:any ){
  //   this.profile.weight=event.target.value;
  // }
  

  skip(){
    this.navCtrl.setRoot(ProfilepicPage)

  }
 createProfile()  {
   

  this.afAuth.authState.take(1).subscribe(data=>{
    const obj = this.afDatabase.object('users')
//     var ref = firebase.database().ref().child(`users/${data.uid}`);
//     var profile = .child("gracehop");
// hopperRef.update({
//   "nickname": "Amazing Grace"
});
   if( this.profile.weight=="Featherweight-65kg")
   this.afAuth.authState.take(1).subscribe(auth => {
    this.afDatabase.list(`users/${auth.uid}`).push(this.profile)
     .then(() => this.navCtrl.setRoot(ProfilepicPage));

  })

  else if(this.profile.weight== "Lightweight-70kg")
  {
    this.afAuth.authState.take(1).subscribe(auth => {
      this.afDatabase.list(`users/${auth.uid}`).push(this.profile)
       .then(() => this.navCtrl.setRoot(ProfilepicPage));
  
    })
  
  }

  else if (this.profile.weight== "Welterweight-77kg"){
    this.afAuth.authState.take(1).subscribe(auth => {
      this.afDatabase.object(`Welterweight/${auth.uid}`).set(this.profile)
       .then(() => this.navCtrl.setRoot(ProfilepicPage));
  
    })

  }

  else if (this.profile.weight == "Middleweight-85kg"){
    this.afAuth.authState.take(1).subscribe(auth => {
      this.afDatabase.object(`Middleweight/${auth.uid}`).set(this.profile)
       .then(() => this.navCtrl.setRoot(ProfilepicPage));
  
    })

  }

  else if (this.profile.weight == "Light Heavyweight-95kg"){
    this.afAuth.authState.take(1).subscribe(auth => {
      this.afDatabase.object(`Light Heavyweight/${auth.uid}`).set(this.profile)
       .then(() => this.navCtrl.setRoot(ProfilepicPage));
  
    })

  }
    
   else if (this.profile.weight=="Heavyweight-95kg+")
   this.afAuth.authState.take(1).subscribe(auth => {
    this.afDatabase.object(`Heavyweight/${auth.uid}`).set(this.profile)
     .then(() => this.navCtrl.setRoot(ProfilepicPage));

  })
  else(err)=>{
    console.log(err)
  }
  

}

  ionViewDidLoad() {
    console.log('ionViewDidLoad FighterdetailsPage');
  }

}
