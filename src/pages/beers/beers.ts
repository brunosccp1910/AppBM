import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { CervejasProvider } from '../../providers/cervejas/cervejas';
import { CervejaDetalhePage } from '../cerveja-detalhe/cerveja-detalhe';

/**
 * Generated class for the BeersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-beers',
  templateUrl: 'beers.html',
  providers : [
    CervejasProvider
  ]
})
export class BeersPage {
  public lista_cervejas =  new Array<any>();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private cervejasProvider: CervejasProvider,
    public modalCtrl: ModalController
  ) {
  }

  

  ionViewDidLoad() {
    console.log('ionViewDidLoad BeersPage');

    this.cervejasProvider.getCervejasCliente().subscribe(
      data => {
        const response = (data as any);
        const objeto_retorno = JSON.parse(response._body);
        this.lista_cervejas = objeto_retorno;
        console.log(data);
      }, error => {
        console.log(error);
      }
    )
    console.log(this.lista_cervejas);

  }

  goToDetalheCervejas(idCerveja){
    let modal = this.modalCtrl.create(CervejaDetalhePage,{
      cervejas : this.lista_cervejas
    });
    modal.present();
    modal.onDidDismiss(data => console.log(data));
  }

}
