import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { HomePage } from '../home/home';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { Device } from '@ionic-native/device';

import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-intro',
  templateUrl: 'intro.html',
  providers : [
    UsuarioProvider
  ]
})
export class IntroPage {
  @ViewChild(Slides) slides: Slides;
  public userData: any;

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     private usuarioProvider: UsuarioProvider,
     private facebook: Facebook,
     public device: Device
    ) {
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad IntroPage');
  }
  
  

  public goToTabsPage(){
    var user = this.getUserData();
    this.usuarioProvider.salvarUsuario(user);
    console.log("Mandou pra Home");
    this.navCtrl.push(TabsPage, {
      userData: user
    });
  }

  loginWithFB() {
    this.facebook.login(['email', 'public_profile']).then((response: FacebookLoginResponse) => {
      this.facebook.api('me?fields=id,name,email,first_name,picture.width(720).height(720).as(picture_large)', []).then(profile => {
        this.userData = {
        email: profile['email'],
        id: profile['id'],
        first_name: profile['first_name'], 
        picture: profile['picture_large']['data']['url'], 
        username: profile['name'],
        uuid: this.device.uuid,
        device: this.device.model,
        plataforma: this.device.platform
      }
        console.log("Mandando UserData",this.userData)
        this.setUserData(this.userData);
        this.goToTabsPage();
      });
    });
  }

  getUserData(){
    return this.userData;
  }

  setUserData(userData){
    this.userData = userData;
  }

  goToSlide() {
    this.slides.slideTo(2, 500);
  }
  
  
}
