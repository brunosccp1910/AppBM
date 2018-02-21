import { Component, ViewChild, ViewChildren  } from '@angular/core';
import { NavParams, ViewController,App,IonicApp } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ToastController } from 'ionic-angular';
import { CervejasProvider } from '../../providers/cervejas/cervejas';
import {Events} from 'ionic-angular';

@Component({
  selector: 'comentario-avaliacao',
  templateUrl: 'comentario-avaliacao.html',
  providers: [
    CervejasProvider
  ]
})
export class ComentarioAvaliacaoPage {
  rate:any;
  aval: any;
  cerveja: any;
  avaliacaoUsuario:any;
  userdata = new Array<any>();
  textoBotaoAvaliacao:String;
  textoBotaoComentario:String;
  avaliacao = {valor:0,habilitaBotao:false,desabilitaAvaliacao:false,titulo:"Avaliar Cerveja"};
  comentario = {valor:"",habilitaBotao:false,habilitaComentario:true};
  constructor(public viewCtrl: ViewController, params: NavParams,private toastCtrl: ToastController,public cervejaProvider: CervejasProvider, public storage: Storage ,public events: Events) {
    this.cerveja = params.get('cerveja');
    this.avaliacaoUsuario = params.get('avaliacao');
    this.textoBotaoAvaliacao = "Enviar Avaliação";
    this.textoBotaoComentario = "Enviar Comentário";
    this.comentario.valor = "";        
    this.storage.get('hash').then((val) => {
      this.userdata = val;
    });
    this.events.subscribe('comentario:resposta', (dados) => {
      this.respostaEnvioComentario(dados);
    });
    this.events.subscribe('avaliacao:resposta', (dados) => {
      this.respostaEnvioAvaliacao(dados);
    });
    if(this.avaliacaoUsuario!=null){
      this.rate = this.avaliacaoUsuario.vl_nota;
      this.avaliacao.titulo = "Reavaliar Cerveja";
    }
    
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
  onAvalicaoAlterado(op) {
    this.avaliacao.valor = op;
    this.avaliacao.habilitaBotao = true;    
  }
  enviarAvaliacao(){
    this.cervejaProvider.setAvaliacao({ hash: this.userdata['hash'], idcerveja: this.cerveja.id_cerveja, valor: this.avaliacao.valor });   
    this.avaliacao.habilitaBotao = false;
    this.textoBotaoAvaliacao = "Enviando...";
  }
  digitando(){
    this.comentario.habilitaBotao = this.comentario.valor !="";      
  }
  enviarComentario(){
    this.cervejaProvider.setComentario({ hash: this.userdata['hash'], idcerveja: this.cerveja.id_cerveja, texto: this.comentario.valor });   
    this.textoBotaoComentario = "Enviando...";
    this.comentario.habilitaBotao = false;
    
  
  }
  respostaEnvioAvaliacao(dados){
    this.textoBotaoAvaliacao = "Enviada com sucesso";
  }
  respostaEnvioComentario(dados){
    this.textoBotaoComentario = "Enviado com sucesso";
    /*let toast = this.toastCtrl.create({
      message: "Enviado com sucesso",
      duration: 3000,
      position: 'top'
    });
  
    toast.onDidDismiss(() => {
      this.comentario.valor = "";
      this.textoBotaoComentario = "Enviar Comentário";
    });
  
    toast.present();*/
  }
  
}
