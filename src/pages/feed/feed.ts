import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BeersPage } from '../beers/beers';
import { MapPage } from '../map/map';
import { CervejasProvider } from '../../providers/cervejas/cervejas';

@IonicPage()
@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html',
  providers: [
    CervejasProvider
  ]
})
export class FeedPage {

  public lista_estabelecimentos = new Array<any>();
  public prevPage: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public cervejasProvider: CervejasProvider,
  ) {
  }
  ionViewDidLoad() {
    this.prevPage = this.navParams.get('page');
    console.log("daqui até lá",this.calculateDistance(-2.5558528,-2.49395060,-44.248103099999994,-44.27560080));
    if (this.prevPage == 'home') {
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
    } else {
      this.cervejasProvider.getEstabelecimentosById(this.navParams.get('idCerveja')).subscribe(
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
  }

  public goToBeers(estabelecimento) {
    this.navCtrl.push(BeersPage, {
      estabelecimento: estabelecimento
    });;
  }

  public goToMaps(estabelecimento) {
    this.navCtrl.push(MapPage, {
      estabelecimento: estabelecimento
    });;
  }

  public calculateDistance(lat1:number,lat2:number,long1:number,long2:number){
    let p = 0.017453292519943295;    // Math.PI / 180
    let c = Math.cos;
    let a = 0.5 - c((lat1-lat2) * p) / 2 + c(lat2 * p) *c((lat1) * p) * (1 - c(((long1- long2) * p))) / 2;
    let dis = (12742 * Math.asin(Math.sqrt(a))); // 2 * R; R = 6371 km
    return dis;
  }

}
