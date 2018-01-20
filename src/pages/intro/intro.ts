import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { HomePage } from '../home/home';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';

@IonicPage()
@Component({
  selector: 'page-intro',
  templateUrl: 'intro.html',
  providers : [
    UsuarioProvider
  ]
})
export class IntroPage {
  public userData: any;

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     private usuarioProvider: UsuarioProvider,
     private facebook: Facebook
    ) {
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad IntroPage');
  }

  public goToTabsPage1(){
    //var user =JSON.stringify(this.getUserData());
    var user =(this.getUserData());
    this.navCtrl.push(HomePage, {
    userData: user
    //var user =(this
    });
  }
  public goToTabsPage(){
    var user =JSON.parse(this.getUserData());
    this.usuarioProvider.salvarUsuario(user);
    this.navCtrl.push(TabsPage, {
    userData: user
    });
  }

  loginWithFB() {
    this.facebook.login(['email', 'public_profile']).then((response: FacebookLoginResponse) => {
      this.facebook.api('me?fields=id,name,email,first_name,picture.width(720).height(720).as(picture_large)', []).then(profile => {
        this.userData = {email: profile['email'], first_name: profile['first_name'], picture: profile['picture_large']['data']['url'], username: profile['name']}
      });
    });
  }

  getUserData(){
    return this.userData;
  }

  setUserData(userData){
    this.userData = userData;
  }
  
  
}
