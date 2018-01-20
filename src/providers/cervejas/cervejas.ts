import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

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

  
      
}




  





