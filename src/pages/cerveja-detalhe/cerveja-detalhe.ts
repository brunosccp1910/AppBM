import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';

/**
 * Generated class for the CervejaDetalhePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cerveja-detalhe',
  templateUrl: 'cerveja-detalhe.html',
})
export class CervejaDetalhePage {
  cervejas:any

  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCrtl: ViewController) {
    this.cervejas = this.navParams.get('cervejas');

    console.log("Cervejas: "+this.cervejas);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CervejaDetalhePage');
  }
  close(){
    this.viewCrtl.dismiss({ returnar: "Retorna algo"});
  }
}
