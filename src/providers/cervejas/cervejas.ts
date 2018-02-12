import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/map'

@Injectable()
export class CervejasProvider {
  private urlBase = "http://app.beercomigo.com/";
  data: any = {};

  constructor(public http: Http) {

    console.log('Hello CervejasProvider Provider');
    this.data.response = '';
  }

  getCervejas() {
    return this.http.get(this.urlBase + "cervejas");
  }
  getEstabelecimentos() {
    return this.http.get(this.urlBase + "estabelecimento");
  }
  getCervejasCliente(id) {
    return this.http.get(this.urlBase + "cervejas/cliente/"+id);
  }
  getNumLikesComentario(id){
    return this.http.get(this.urlBase + "comentario/get/numlikescomentario/"+id);
  }
  addNumLikesComentario(id){
    return this.http.get(this.urlBase + "comentario/add/numlikescomentario/"+id);
  }
  setLsikeBeer(ids){
    console.log(this.urlBase + "cerveja/setlike/"+ids['idcerveja']+"/"+ids['iduser']);
    return this.http.get(this.urlBase + "cerveja/setlike/"+ids['idcerveja']+"/"+ids['iduser']);
  }
  getComentario(id) {
    return this.http.get(this.urlBase + "getcomentario/"+id);
  }
  setComentario(comentario : any){
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
        this.http.post(url, comentario,options)
          .subscribe((result: any) => {
            console.log(result);
          },
          (error) => {
            console.log(error);
          });
      });
    }
    setLikeBeer(ids : any){
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
          this.http.post(url, ids,options)
            .subscribe((result: any) => {
              console.log(result);
            },
            (error) => {
              console.log(error);
            });
        });
      }

      jaProvei(ids : any){
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
            this.http.post(url, ids,options)
              .subscribe((result: any) => {
                console.log(result);
              },
              (error) => {
                console.log(error);
              });
          });
        }
}

  
      





  





