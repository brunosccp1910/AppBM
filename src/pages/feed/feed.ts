import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BeersPage } from '../beers/beers';
import { MapPage } from '../map/map';
import { CervejasProvider } from '../../providers/cervejas/cervejas';
import { Geolocation ,GeolocationOptions ,Geoposition ,PositionError } from '@ionic-native/geolocation'; 
import { map } from 'rxjs/operator/map';


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
  currentPos : Geoposition;
  options : GeolocationOptions;
  public flag:boolean = false;



  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public cervejasProvider: CervejasProvider,
    private geolocation : Geolocation
  ) {

  }
  ionViewDidLoad() {
    this.prevPage = this.navParams.get('page');

    if (this.prevPage == 'home') {
      this.cervejasProvider.getEstabelecimentos().subscribe(
        data => {
          const response = (data as any);
          const objeto_retorno = JSON.parse(response._body);
          this.lista_estabelecimentos = objeto_retorno;
          this.getUserPosition(this.lista_estabelecimentos);
          console.log(this.lista_estabelecimentos);
        }, error => {
          console.log(error);
        }
      )
    } else {
      this.cervejasProvider.getEstabelecimentosById(this.navParams.get('idCerveja')).subscribe(
        data => {
          const response = (data as any);
          const objeto_retorno = JSON.parse(response._body);

 
          this.lista_estabelecimentos = Array.of(objeto_retorno);
      
         
          this.getUserPosition(this.lista_estabelecimentos);
          console.log('ToArray',this.lista_estabelecimentos);
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

  objToArray(obj){

  }

  getUserPosition(lista_estabelecimentos){
    this.options = {
    enableHighAccuracy : false
    };
    this.geolocation.getCurrentPosition(this.options).then((pos : Geoposition) => {
        this.currentPos = pos;
        for (let estab of lista_estabelecimentos) {
          estab['distance'] = this.calculateDistance(this.currentPos['coords']['latitude'],estab['vl_latitude'],this.currentPos['coords']['longitude'],estab['vl_longitude']).toFixed(2);
        }
          var ascending = lista_estabelecimentos.sort((a, b) => Number(a.distance) - Number(b.distance));
          this.lista_estabelecimentos = ascending;
        

    },(err : PositionError)=>{
        console.log("error : " + err.message);
    ;
    })
  }
}
