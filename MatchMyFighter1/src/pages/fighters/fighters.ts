import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { RequestsProvider } from '../../providers/requests/requests';
import { connreq } from '../../models/interfaces/requests';
import{AngularFireDatabase, AngularFireObject} from 'angularfire2/database';
import firebase, { auth } from 'firebase';
import { Profile } from '../../models/interfaces/profile';
import { AngularFireAuth } from 'angularfire2/auth';
import { not } from '@angular/compiler/src/output/output_ast';
/**
 * Generated class for the FightersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-fighters',
  templateUrl: 'fighters.html',
})
export class FightersPage {
  newrequest = {} as connreq;
  temparr = [];
  feather = [];
  filteredusers = [];
  fighterProfile: AngularFireObject<Profile>
  

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public userservice: UserProvider, public alertCtrl: AlertController,
    public requestservice: RequestsProvider, private afDatabase: AngularFireDatabase,
    public afAuth: AngularFireAuth, private toast: ToastController,  ) {


    this.userservice.getallusers().then((res: any) => {
      this.filteredusers = res;
      this.temparr = res;
      // console.log(snapshot.val())
      
   })
  }

  
  ionViewDidLoad() {
    // this.afAuth.authState.take(1).subscribe(data=>{
    //   var ref = firebase.database().ref().child(`users/${data.uid}`);
    //   if(ref != null){
    //     ref.on("value", function(snapshot) {
          
    //       // console.log(snapshot.val());

    //       let details = snapshot.val();
    //        let currentdetails = [];
    //     for (var key in details) {
    //       currentdetails.push(details[key]);}
    //     }, function (errorObject) {
    //       console.log("The read failed: " + errorObject.code);
    //     });

    //   }
    //   else(err)=>{
    //     console.log(err);
    //   }
      

    // }
    // )
   

// Attach an asynchronous callback to read the data at our posts reference

    

  }

  // match(){
   
  //     this.afAuth.authState.take(1).subscribe(data=>{
  //     firebase.database().ref().child(`Featherweight/${data.uid}`).on('value', function(snapshot) {
  //       snapshot.forEach(function(child) {
  //       console.log(snapshot.val());
  //       var datas = child.val();
  //       var title =child.val().title;
  //       var lastname=child.val().lastname;
  //       var username= child.val().username;
  //       var weight = child.val().weight;
  //       var fights= child.val().fights;
  //       if(weight== "feahterweight"){
  //         console.log(weight, datas)
  //         return true;
  
  //       }
  //      else(err)=>{
  //        console.log(err);
  //      }
  //       }
  //       )}
  //   )
  //   }
  //     )}

// showfighter(){
//   var uid = firebase.auth().currentUser.uid;
//   var ref= firebase.database().ref("featherweight/"+ uid);
//   if (ref == undefined) {
    
    
//   }


// }



  searchuser(searchbar) {
    this.filteredusers = this.temparr;
   
    var q = searchbar.target.value;
    if (q.trim() == '') {
      return;
    }

    this.filteredusers = this.filteredusers.filter((v) => {
      if (v.displayName.toLowerCase().indexOf(q.toLowerCase()) > -1) {
        return true;
      }
      return false;
    })
  }

  sendreq(recipient) {
    this.newrequest.sender = firebase.auth().currentUser.uid;
    this.newrequest.recipient = recipient.uid;
    if (this.newrequest.sender === this.newrequest.recipient)
      alert('You are your friend always');
    else {
      let successalert = this.alertCtrl.create({
        title: 'Request sent',
        subTitle: 'Your request was sent to ' + recipient.displayName,
        buttons: ['ok']
      });
    
      this.requestservice.sendrequest(this.newrequest).then((res: any) => {
        if (res.success) {
          successalert.present();
          let sentuser = this.filteredusers.indexOf(recipient);
          this.filteredusers.splice(sentuser, 1);
        }
      }).catch((err) => {
        alert(err);
      })
    }
  }


}