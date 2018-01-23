import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { Storage } from '@ionic/storage/dist/storage';


@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
  providers : [
    UsuarioProvider
  ]
})
export class UserPage {
  public userdata =  new Array<any>();
  public id:any
  constructor(private usuarioProvider: UsuarioProvider,private storage:Storage) {
    
  }


  ionViewDidLoad() {
    this.storage.get('cliente').then((val) => {
      this.usuarioProvider.getUserInfo(val.id).subscribe(
        data => {
          const response = (data as any);
          const objeto_retorno = JSON.parse(response._body);
          this.userdata = objeto_retorno;
          console.log(this.userdata);
        }, error => {
          console.log(error);
        }
      )
    });
  }

  

}
