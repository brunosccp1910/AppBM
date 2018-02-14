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

     /* var user={
        device:"Android SDK built for x86",
        email:"bruno_eduhardy@hotmail.com",
        first_name:"Bruno",
        id:"1782824875081997",
        picture:"https://scontent.xx.fbcdn.net/v/t1.0-1/18198202_1522857201078767_4982598060035143686_n.jpg?oh=9876e42d0115dbe665db4ba2b1574f3e&oe=5ADAC140",
        plataforma:"Android",
        username:"Bruno Eduardo",
        uuid:"4c2cfa306025fe77",
        hash:"QaLpqYCFwdZ7vyRWGS1Y"
        };
       this.storage.set('hash',user);
       */

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
