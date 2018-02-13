import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { IntroPage } from '../pages/intro/intro';
import { Storage } from '@ionic/storage/dist/storage';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  
  cadastrado:boolean = false;
  rootPage:any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,private storage:Storage
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need
      this.storage.get('hash').then((val) => {
        if(val){
          this.cadastrado = true
        }
        if(this.cadastrado){
          this.rootPage = TabsPage;
        }else{
          this.rootPage = IntroPage;
        }
      });  
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
