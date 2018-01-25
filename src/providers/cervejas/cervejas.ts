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
  getCervejasCliente() {
    return this.http.get(this.urlBase + "cervejas/cliente");
  }
  getComentario(id) {
    return this.http.get(this.urlBase + "getcomentario/"+id);
  }
  setComentario(comentario : any){
    console.log("Passou daqui");
    let myHeaders = new Headers({
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
    });
    let options = new RequestOptions({
        headers: myHeaders
    });
    comentario = JSON.stringify(comentario);
    console.log("Vaiaushaushasu:",comentario);

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
}

  
      





  





