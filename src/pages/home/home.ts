import { Component } from '@angular/core';
import { UsuarioProvider } from '../../providers/usuario/usuario';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers : [
    UsuarioProvider
  ]
})
export class HomePage {
  userInfo:any
  constructor(private usuarioProvider: UsuarioProvider,) {
    //this.userInfo = JSON.parse(navParams.get('userData'));


  }

  ionViewDidLoad() {
      this.usuarioProvider.getUsuario().then((val) => {
        console.log(val);
      });

  }
}
