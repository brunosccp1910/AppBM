import { Component } from '@angular/core';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers : [
    UsuarioProvider
  ]
})
export class HomePage {
  userInfo:any
  constructor(private usuarioProvider: UsuarioProvider,navParams: NavParams) {
    
  }

  ionViewDidLoad() {
      this.usuarioProvider.getUsuario().then((val) => {
        console.log(val);
        this.userInfo = val;
      });

  }
}
