import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BeersPage } from '../beers/beers';
import { MapPage } from '../map/map';

@IonicPage()
@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html',
 
})
export class FeedPage {
  public categoria_cerveja:string = "Onde encontrar cervejas";

  public lista_cervejas =  new Array<any>();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
  ) {
  }

  public mostra_cervejas(tipo_cerveja:string){
    alert("Essas cervejas são boas");
  }

  public  goToBeers(){
    this.navCtrl.push(BeersPage);
  }

  public  goToMaps(){
    this.navCtrl.push(MapPage);
  }

}
