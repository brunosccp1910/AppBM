import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { ComentariosPage } from '../comentarios/comentarios';
import { CervejasProvider } from '../../providers/cervejas/cervejas';
import { FeedPage } from '../feed/feed';
import { Storage } from '@ionic/storage/dist/storage';




@IonicPage()
@Component({
  selector: 'page-beerlist',
  templateUrl: 'beerlist.html',
  providers : [
    CervejasProvider
  ]
})
export class BeerlistPage {
  public lista_cervejas =  new Array<any>();
  public lista_cervejasAuxiliar =  new Array<any>();
  public userdata =  new Array<any>();
  public estabelecimento:any;
  public nome_cerveja:string;
  public flag:boolean = false;
  
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public cervejasProvider: CervejasProvider,
     public modalCtrl: ModalController,
     private storage:Storage
  ) {
  }

  ionViewDidLoad() {
    this.storage.get('hash').then((val) => {
      this.userdata = val;
      console.log(this.userdata);
    });  
    this.cervejasProvider.getCervejasCliente(5).subscribe(
      data => {
        const response = (data as any);
        const objeto_retorno = JSON.parse(response._body);
        this.lista_cervejas = objeto_retorno;
        console.log('aux',this.lista_cervejas);    
        //console.log(data);
      }, error => {
        console.log(error);
      }
    )

  }

  goToComentariosPage(Cerveja){
    let modal = this.modalCtrl.create(ComentariosPage,{
      cerveja : Cerveja
      
    });
    modal.present();
    modal.onDidDismiss(data => console.log(data));
  }

  initializeItems() {
    this.cervejasProvider.getCervejasCliente(5).subscribe(
      data => {
        const response = (data as any);
        const objeto_retorno = JSON.parse(response._body);
        this.lista_cervejas = objeto_retorno;
        console.log(data);
      }, error => {
        console.log(error);
      }
    )
  }

  getCervejas(){
     this.lista_cervejasAuxiliar = this.lista_cervejas;
  }
 
  getItems(ev: any) {
    // Reset items back to all of the items
    this.flag = true;
    this.getCervejas();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.lista_cervejasAuxiliar = this.lista_cervejasAuxiliar.filter((item) => {
        return (item.ds_cerveja_abrev.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
      console.log("GetItems",val,this.lista_cervejasAuxiliar);
    }
  }

  jaProvei(idCerveja) {
    var like = {hash: this.userdata['hash'],idcerveja:idCerveja}
    this.cervejasProvider.jaProvei(like);
  }
  setLikeBeer(idCerveja) {
    var like = {hash: this.userdata['hash'],idcerveja:idCerveja}
    this.cervejasProvider.setLikeBeer(like);
  }

  goToEstabelecimentos(idCerveja){
    this.navCtrl.push(FeedPage, {
      page: 'beerlist',
      idCerveja: idCerveja
    });  
  }

}
