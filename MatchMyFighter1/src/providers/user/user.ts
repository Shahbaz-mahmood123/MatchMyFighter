import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';
import { HttpModule } from '@angular/http';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class UserProvider {
  firedata = firebase.database().ref('/users');
  featherweight= firebase.database().ref(`/Featherweight`);
  lightweight= firebase.database().ref(`/Lightweigh`);
  welterweight= firebase.database().ref(`/Welterweight`);
  middleweight= firebase.database().ref(`/Middleweight`);
  lightheavy= firebase.database().ref(`/Light Heavyweight`);
  heavyweight= firebase.database().ref(`/Heavyweight`);
  constructor(public afireauth: AngularFireAuth) {
  }

  adduser(newuser) {
    var promise = new Promise((resolve, reject) => {
      this.afireauth.auth.createUserWithEmailAndPassword(newuser.email, newuser.password).then(() => {
        this.afireauth.auth.currentUser.updateProfile({
          displayName: newuser.displayName,
          photoURL: '',
        }).then(() => {
          // if(newuser.usertype== "Promoter/Coach")
          // {
          //   this.firedata.child(this.afireauth.auth.currentUser.uid).set({
          //     uid: this.afireauth.auth.currentUser.uid,
          //     displayName: newuser.displayName,
          //     photoURL: 'https://firebasestorage.googleapis.com/v0/b/matchmyfighter1.appspot.com/o/profileimages%2Fblack-and-white-sport-fight-boxer.jpg?alt=media&token=7631cfa2-4c1a-4cd5-a2a5-5cb1f956f3c2',
          //     events: newuser.events,
          //     gym: newuser.gym, 
          //     contact: newuser.contact
          //   })
        

          // }
          // else if (newuser.usertype== "Fighter"){
          this.firedata.child(this.afireauth.auth.currentUser.uid).set({
            uid: this.afireauth.auth.currentUser.uid,
            displayName: newuser.displayName,
            photoURL: 'https://firebasestorage.googleapis.com/v0/b/matchmyfighter1.appspot.com/o/profileimages%2Fblack-and-white-sport-fight-boxer.jpg?alt=media&token=7631cfa2-4c1a-4cd5-a2a5-5cb1f956f3c2',
            weight:newuser.weight,
            gender: newuser.gender,
            fights: newuser.fights,
            info: newuser.info,
            age: newuser.age,
            firstname: newuser.firstname,
            lastname: newuser.lastname,
            titles: newuser.titles,
            gym: newuser.gym,
            style: newuser.style,
            contact: newuser.contact

            
          
            }).then(() => {
            resolve({ success: true });
            
            }).catch((err) => {
              reject(err);
          })
         }).catch((err) => {
            reject(err);
            
        })
      }).catch((err) => {
        reject(err);
      })
    })
    return promise;
  }
  
passwordreset(email) {
    var promise = new Promise((resolve, reject) => {
      firebase.auth().sendPasswordResetEmail(email).then(() => {
        resolve({ success: true });
      }).catch((err) => {
        reject(err);
      })
      return promise;
    })
   
    
  }
  updateimage(imageurl) {
    var promise = new Promise((resolve, reject) => {
        this.afireauth.auth.currentUser.updateProfile({
            displayName: this.afireauth.auth.currentUser.displayName,
            photoURL: imageurl      
        }).then(() => {
            firebase.database().ref('/users/' + firebase.auth().currentUser.uid).update({
            displayName: this.afireauth.auth.currentUser.displayName,
            photoURL: imageurl,
            uid: firebase.auth().currentUser.uid
            }).then(() => {
                resolve({ success: true });
                }).catch((err) => {
                    reject(err);
                })
        }).catch((err) => {
              reject(err);
           })  
    })
    return promise;
}
getuserdetails() {
  var promise = new Promise((resolve, reject) => {
  this.firedata.child(firebase.auth().currentUser.uid).once('value', (snapshot) => {
    resolve(snapshot.val());
  }).catch((err) => {
    reject(err);
    })
  })
  return promise;
}
// getfeatherweightdetails(){

//   var promise = new Promise((resolve, reject) => {
//     this.featherweight.child(firebase.auth().currentUser.uid).once('value', (snapshot) => {
//       resolve(snapshot.val());
//     }).catch((err) => {
//       reject(err);
//       })
//     })
//     return promise;
//   }

updatedisplayname(newname, newweight) {
    var promise = new Promise((resolve, reject) => {
      this.afireauth.auth.currentUser.updateProfile({
      displayName: newname,
      photoURL: this.afireauth.auth.currentUser.photoURL,
    }).then(() => {
      this.firedata.child(firebase.auth().currentUser.uid).update({
        displayName: newname,
        photoURL: this.afireauth.auth.currentUser.photoURL,
        uid: this.afireauth.auth.currentUser.uid,
      }).then(() => {
        resolve({ success: true });
      }).catch((err) => {
        reject(err);
      })
      }).catch((err) => {
        reject(err);
    })
    })
    return promise;
  }
 
  getallusers() {
    var promise = new Promise((resolve, reject) => {
      this.firedata.orderByChild('uid').once('value', (snapshot) => {
        let userdata = snapshot.val();
        let temparr = [];
        
        for (var key in userdata) {
          temparr.push(userdata[key]);
        }
        resolve(temparr);
      }).catch((err) => {
        reject(err);
      })
    })
    return promise;
  }

//   getfeathweight(){
// var promise = new promise((resolve, reject) =>{
//   this.featherweight.orderByChild('uid').once('value', (snapshot)=>{
//     let userdata = snapshot.val();
//     let feather = [];
//     for (var key in userdata) {
//       feather.push(userdata[key]);
//     }
//     resolve(feather);
//   }).catch((err) => {
//     reject(err);
//   })
// })
// return promise;
// }

}