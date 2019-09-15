import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http'; 
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import{config} from'./app.firebaseconfig'
import { LoginPageModule } from '../pages/login/login.module';
import{ProfilepicPage} from '../pages/profilepic/profilepic';
import { BuddiesPage } from '../pages/buddies/buddies';
import{FighterdetailsPage} from '../pages/fighterdetails/fighterdetails';
//import { BuddiesPageModule } from '../pages/buddies/buddies.module';
//import{LoginPage} from'../pages/login/login'



import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { AuthProvider } from '../providers/auth/auth';
import { UserProvider } from '../providers/user/user';
import { ImghandlerProvider } from '../providers/imghandler/imghandler';
import {AngularFireDatabase, AngularFireDatabaseModule} from 'angularfire2/database';

import { File } from '@ionic-native/file';
import { FileChooser } from '@ionic-native/file-chooser';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import { RequestsProvider } from '../providers/requests/requests';
import { ChatProvider } from '../providers/chat/chat';

@NgModule({
  declarations: [
    MyApp,
    ProfilepicPage,
    BuddiesPage,
    FighterdetailsPage
    
    
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp ),
    AngularFireModule.initializeApp(config),
    LoginPageModule,
    AngularFireDatabaseModule 
  ],
  bootstrap: [IonicApp], 
  entryComponents: [
    MyApp,
    ProfilepicPage,
    BuddiesPage,
    FighterdetailsPage
   
  
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AngularFireAuth,
    AuthProvider,
    UserProvider,
    ImghandlerProvider,
    File,
    FileChooser,
    FilePath,
    Camera,
    RequestsProvider,
    ChatProvider,
  ]
})
export class AppModule {}
