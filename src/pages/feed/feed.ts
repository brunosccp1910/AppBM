import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BeersPage } from '../beers/beers';
import { MapPage } from '../map/map';
import { CervejasProvider } from '../../providers/cervejas/cervejas';

@IonicPage()
@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html',
  providers : [
    CervejasProvider
  ]
})
export class FeedPage {

  public lista_estabelecimentos =  new Array<any>();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public cervejasProvider: CervejasProvider,
  ) {
  }
  ionViewDidLoad() {
    console.log("Entrou no feed");
    this.cervejasProvider.getEstabelecimentos().subscribe(
      data => {
        const response = (data as any);
        const objeto_retorno = JSON.parse(response._body);
        this.lista_estabelecimentos = objeto_retorno;
        console.log("Buscou clientes");
        console.log(data);
      }, error => {
        console.log(error);
      }
    )
  }

  public  goToBeers(estabelecimento){
    this.navCtrl.push(BeersPage, {
      estabelecimento: estabelecimento
      });;
  }

  public  goToMaps(estabelecimento){
    this.navCtrl.push(MapPage, {
      estabelecimento: estabelecimento
      });;  }

}
