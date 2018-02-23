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
  public listacervejas =  new Array<any>();
  public listacomentarios =  new Array<any>();
  public flag:boolean = true;//true  = cerveja e false = comentario


  public id:any
  constructor(private usuarioProvider: UsuarioProvider,private storage:Storage) {
    this.getCervejasProvadas();
    this.getCervejasComentadas();

  }


  ionViewDidLoad() {
    this.storage.get('hash').then((val) => {
      this.usuarioProvider.getUserInfo(val.hash).subscribe(
        data => {
          const response = (data as any);
          const objeto_retorno = JSON.parse(response._body);
          this.userdata = (objeto_retorno);
        }, error => {
          console.log(error);
        }
      )
    });
  }

  getCervejasProvadas(){
    this.storage.get('hash').then((val) => {
      this.usuarioProvider.getCervejasProvadas(val.hash).subscribe(
        data => {
          const response = (data as any);
          const objeto_retorno = JSON.parse(response._body);
          this.listacervejas = Array.of(objeto_retorno);
          this.listacervejas = this.listacervejas[0];

          console.log('Provadas:',this.listacervejas);

        }, error => {
          console.log(error);
        }
      )
    });
  }

  getCervejasComentadas(){
    this.storage.get('hash').then((val) => {
      this.usuarioProvider.getCervejasComentadas(val.hash).subscribe(
        data => {
          const response = (data as any);
          const objeto_retorno = JSON.parse(response._body);
          this.listacomentarios = Array.of(objeto_retorno);
          this.listacomentarios = this.listacomentarios[0];

          console.log('Comentarios:',this.listacomentarios);

        }, error => {
          console.log(error);
        }
      )
    });
  }
  setFlagBeer(){
    this.flag = true;//true  = cerveja
  }
  setFlagComment(){
    this.flag = false;//false = comentario
  }

  

}
