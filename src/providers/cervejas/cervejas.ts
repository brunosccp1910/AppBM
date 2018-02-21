import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import {Events} from 'ionic-angular';
import 'rxjs/add/operator/map'

@Injectable()
export class CervejasProvider {
  private urlBase = "http://app.beercomigo.com/";
  data: any = {};

  constructor(public http: Http,public events: Events) {
    this.data.response = '';
  }

  getCervejas() {
    return this.http.get(this.urlBase + "cervejas");
  }
  getEstabelecimentos() {
    return this.http.get(this.urlBase + "estabelecimento");
  }
  getEstabelecimentosById(idCerveja) {
    return this.http.get(this.urlBase + "estabelecimento/" + idCerveja);
  }
  getCervejasCliente(id) {
    return this.http.get(this.urlBase + "cervejas/cliente/" + id);
  }
  getComentario(id,hash) {
    return this.http.get(this.urlBase + "getcomentario/" + id+"/"+hash);
  }

  setComentario(comentario: any) {
    let myHeaders = new Headers({
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    });
    let options = new RequestOptions({
      headers: myHeaders
    });
    comentario = JSON.stringify(comentario);

    return new Promise((resolve, reject) => {
      let url = this.urlBase + "setcomentario";
      this.http.post(url, comentario, options)
        .subscribe((result: any) => {
          console.log(result);
          this.events.publish('comentario:resposta', result);
        },
        (error) => {
          console.log(error);
        });
    });
  }
  setAvaliacao(avaliacao: any) {
    let myHeaders = new Headers({
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    });
    let options = new RequestOptions({
      headers: myHeaders
    });
    avaliacao = JSON.stringify(avaliacao);

    return new Promise((resolve, reject) => {
      let url = this.urlBase + "setavaliacao";
      this.http.post(url, avaliacao, options)
        .subscribe((result: any) => {
          console.log(result);
          this.events.publish('avaliacao:resposta', result);
        },
        (error) => {
          console.log(error);
        });
    });
  }

  setLikeBeer(ids: any) {
    let myHeaders = new Headers({
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    });
    let options = new RequestOptions({
      headers: myHeaders
    });
    ids = JSON.stringify(ids);

    return new Promise((resolve, reject) => {
      let url = this.urlBase + "setlikebeer";
      this.http.post(url, ids, options)
        .subscribe((result: any) => {
          console.log(result);
        },
        (error) => {
          console.log(error);
        });
    });
  }

  setLikeComment(ids: any) {
    let myHeaders = new Headers({
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    });
    let options = new RequestOptions({
      headers: myHeaders
    });
    ids = JSON.stringify(ids);

    return new Promise((resolve, reject) => {
      let url = this.urlBase + "setlikecomment";
      this.http.post(url, ids, options)
        .subscribe((result: any) => {
          console.log(result);
        },
        (error) => {
          console.log(error);
        });
    });
  }

  jaProvei(ids: any) {
    let myHeaders = new Headers({
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    });
    let options = new RequestOptions({
      headers: myHeaders
    });
    ids = JSON.stringify(ids);

    return new Promise((resolve, reject) => {
      let url = this.urlBase + "japrovei";
      this.http.post(url, ids, options)
        .subscribe((result: any) => {
          console.log(result);
        },
        (error) => {
          console.log(error);
        });
    });
  }
}














