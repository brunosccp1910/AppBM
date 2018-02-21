import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { CervejasProvider } from '../../providers/cervejas/cervejas';
import { LoadingController } from 'ionic-angular';
import { ModalController} from 'ionic-angular';
import { ComentarioAvaliacaoPage } from '../comentario-avaliacao/comentario-avaliacao';
import { empty } from 'rxjs/Observer';

@IonicPage()
@Component({
  selector: 'page-comentarios',
  templateUrl: 'comentarios.html',
  providers: [
    CervejasProvider
  ]
    
})
export class ComentariosPage {
  comment = {}
  public idcerveja: any
  public userdata = new Array<any>();
  public comentarios = new Array<any>();
  public cerveja = new Array<any>();
  public avaliacao:any;
  public qtd_likes: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public cervejaProvider: CervejasProvider, public loading: LoadingController,public modalCtrl: ModalController) {
    this.cerveja = this.navParams.get('cerveja');
    this.idcerveja = this.cerveja['id_cerveja'];
  }
  ionViewDidLoad() {
      this.storage.get('hash').then((val) => {
        this.userdata = val;
        this.atualizarComentariosTela();
      });      
   
  }

  addComentario() {
    let myModal = this.modalCtrl.create(ComentarioAvaliacaoPage,{'cerveja':this.cerveja,'avaliacao':this.avaliacao});
    myModal.onDidDismiss(() => {
      this.atualizarComentariosTela();
  });
    myModal.present();

  }
  atualizarComentariosTela() {//modificado
    let loader = this.loading.create({
      content: 'Obtendo informações',
    });
    loader.present().then(() => { });
    this.cervejaProvider.getComentario(this.idcerveja,this.userdata['hash']).subscribe(
      data => {
        const response = (data as any);
        const objeto_retorno = JSON.parse(response._body);
        this.comentarios = objeto_retorno.comentarios;
        console.log('Comentarios',this.comentarios);      
        this.avaliacao = null;
        if(objeto_retorno.avaliacao.length>0)
          this.avaliacao = objeto_retorno.avaliacao[0];  
        loader.dismiss();
      }, error => {
        console.log(error);
      }
    )
    this.storage.get('hash').then((val) => {
      this.userdata = val;
      console.log(this.userdata);
    });
  }

  addLike(idComentario) {
    var like = { hash: this.userdata['hash'], idComentario: idComentario }
    this.cervejaProvider.setLikeComment(like);
    this.atualizarComentariosTela();

  }



}
