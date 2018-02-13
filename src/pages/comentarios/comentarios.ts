import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { CervejasProvider } from '../../providers/cervejas/cervejas';


@IonicPage()
@Component({
  selector: 'page-comentarios',
  templateUrl: 'comentarios.html',
  providers : [
    CervejasProvider
  ]
})
export class ComentariosPage {
  comment = {}
  public idcerveja:any
  public userdata =  new Array<any>();
  public comentarios =  new Array<any>();
  public cerveja =  new Array<any>();
  public qtd_likes:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public storage:Storage,public cervejaProvider:CervejasProvider) {
    this.cerveja = this.navParams.get('cerveja');
    this.idcerveja = this.cerveja['id_cerveja'];

  }
  
  ionViewDidLoad() {
    this.cervejaProvider.getComentario(this.idcerveja).subscribe(
      data => {
        const response = (data as any);
        const objeto_retorno = JSON.parse(response._body);
        this.comentarios = objeto_retorno;
        console.log(this.comentarios);
      }, error => {
        console.log(error);
      }
    )
    this.storage.get('hash').then((val) => {
      this.userdata = val;
      console.log(this.userdata);
    });
  }

  addComentario() {
    this.comment = {hash: this.userdata['hash'],idcerveja:this.idcerveja,texto:this.comment['text']}
    this.cervejaProvider.setComentario(this.comment);
    this.comment['text'] = '';
    this.atualizarComentariosTela();
    
  }
  atualizarComentariosTela(){//modificado
    this.cervejaProvider.getComentario(this.idcerveja).subscribe(
      data => {
        const response = (data as any);
        const objeto_retorno = JSON.parse(response._body);
        this.comentarios = objeto_retorno;
        console.log(this.comentarios);
      }, error => {
        console.log(error);
      }
    )
    this.storage.get('hash').then((val) => {
      this.userdata = val;
      console.log(this.userdata);
    });
  }
  
  addLike(idComentario){
    this.cervejaProvider.addNumLikesComentario(idComentario).subscribe(
      data => {
        this.atualizarComentariosTela(); //modificado
      }, error => {
        console.log(error);
      }
    )
  }

  getLike(idComentario){

    this.cervejaProvider.getNumLikesComentario(idComentario).subscribe(
      data => {
        const response = (data as any);
        const objeto_retorno = JSON.parse(response._body);
        this.qtd_likes = objeto_retorno;
        console.log(this.qtd_likes);
      }, error => {
        console.log(error);
      }
    )
  }

}
