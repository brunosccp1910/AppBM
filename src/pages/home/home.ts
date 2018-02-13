import { Component } from '@angular/core';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FeedPage } from '../feed/feed';
import { BeerlistPage } from '../beerlist/beerlist';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers : [
    UsuarioProvider
  ]
})
export class HomePage {
  userInfo:any
  constructor(private usuarioProvider: UsuarioProvider,public navParams: NavParams,public navCtrl: NavController
  ) {
    
  }

  ionViewDidLoad() {
      this.usuarioProvider.getUsuario().then((val) => {
        this.userInfo = val;
      });
      
  }

  goToBeerList(){
    this.navCtrl.push(BeerlistPage);
  }
  goToFeed(){
    this.navCtrl.push(FeedPage, {
      page: 'home'
    });  
  }
}
