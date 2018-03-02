import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { CervejasProvider } from '../../providers/cervejas/cervejas';
import { Storage } from '@ionic/storage/dist/storage';
import { ComentariosPage } from '../comentarios/comentarios';
import { LoadingController } from 'ionic-angular';
import { empty } from 'rxjs/Observer';


@IonicPage()
@Component({
  selector: 'page-beers',
  templateUrl: 'beers.html',
  providers: [
    CervejasProvider
  ]
})
export class BeersPage {
  public lista_cervejas = new Array<any>();
  public lista_cervejasAuxiliar = new Array<any>();
  public userdata = new Array<any>();
  public estabelecimento: any;
  public nome_cerveja: string;
  public flag: boolean = false;
  public tipoCerveja: any;
  paginacao = { pagAtual: 0, consultaAtiva: false };
  pesquisa = "%20";
  ultimaCategoria = "";
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private cervejasProvider: CervejasProvider,
    public modalCtrl: ModalController,
    private storage: Storage, public loading: LoadingController
  ) {
    this.estabelecimento = this.navParams.get('estabelecimento');
    this.tipoCerveja = "0";
  }

  atualizaListaCervejas(opcao, infiniteScroll) {
    let loader = this.loading.create({
      content: 'Obtendo informações',
    });
    if (opcao == 0) {
      loader.present().then(() => { });
    }
    if(opcao!=1){
      this.paginacao.pagAtual = 0;
      this.ultimaCategoria = "";
    }
    this.paginacao.consultaAtiva = true;
    this.cervejasProvider.getCervejasCliente(this.estabelecimento.id_cliente, this.tipoCerveja, this.paginacao.pagAtual,this.pesquisa).subscribe(
      data => {
        const response = (data as any);
        var objeto_retorno = JSON.parse(response._body);
        for (var i = 0; i < objeto_retorno.length; i++) {
          if (objeto_retorno[i].avaliacao == null) {
            objeto_retorno[i].tipo_estrela = "star-outline";
            objeto_retorno[i].avaliacao = "Sem avaliação";
          } else {
            objeto_retorno[i].avaliacao = parseFloat(objeto_retorno[i].avaliacao).toFixed(2);
            if (parseInt(objeto_retorno[i].avaliacao) != objeto_retorno[i].avaliacao)
              objeto_retorno[i].tipo_estrela = "star-half";
            else
              objeto_retorno[i].tipo_estrela = "star";
          }
          if (objeto_retorno[i].id_categoria != this.ultimaCategoria) {
            objeto_retorno[i].novaCategoria = objeto_retorno[i].id_categoria;
            this.ultimaCategoria = objeto_retorno[i].id_categoria;
          }
          if(objeto_retorno[i].ds_estado!=null){
            objeto_retorno[i].im_pais = objeto_retorno[i].im_estado;
            objeto_retorno[i].ds_pais = objeto_retorno[i].ds_estado;
          }          
          if (opcao == 1)
            this.lista_cervejas.push(objeto_retorno[i]);
        }
        if (opcao == 0||opcao==2)
          this.lista_cervejas = objeto_retorno;
        this.paginacao.consultaAtiva = false;
        if (infiniteScroll != null) 
          infiniteScroll.complete();
        if (opcao == 0)
          loader.dismiss();
      }, error => {
        this.paginacao.consultaAtiva = false;
        if (infiniteScroll != null)
          infiniteScroll.complete();
        console.log(error);
      }
    )
  }
  paginacaoCerveja(infiniteScroll) {
    if (!this.paginacao.consultaAtiva) {
      this.paginacao.pagAtual++;
      this.atualizaListaCervejas(1, infiniteScroll);
    }
  }
  ionViewDidLoad() {
    this.storage.get('hash').then((val) => {
      this.userdata = val;
      console.log(this.userdata);
    });
    this.atualizaListaCervejas(0, null);
  }
  tipoCervejaSel(evt) {
    this.atualizaListaCervejas(0, null);
  }

  goToComentariosPage(Cerveja) {
    let modal = this.modalCtrl.create(ComentariosPage, {
      cerveja: Cerveja

    });
    modal.present();
    modal.onDidDismiss(data => console.log(data));
  }



  getCervejas() {
    this.lista_cervejasAuxiliar = this.lista_cervejas;
  }

  getItems(ev: any) {
    this.pesquisa = ev.target.value;
    if(this.pesquisa=="")this.pesquisa = "%20";
    this.atualizaListaCervejas(2,null);
    /*// Reset items back to all of the items

    this.flag = true;
    this.getCervejas();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.lista_cervejasAuxiliar = this.lista_cervejasAuxiliar.filter((item) => {
        return (item.ds_cerveja_abrev.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
      console.log("GetItems", val, this.lista_cervejasAuxiliar);
    }*/
  }

  jaProvei(idCerveja) {
    var like = { hash: this.userdata['hash'], idcerveja: idCerveja }
    this.cervejasProvider.jaProvei(like);
  }
  setLikeBeer(idCerveja) {
    var like = { hash: this.userdata['hash'], idcerveja: idCerveja }
    this.cervejasProvider.setLikeBeer(like);
  }


}
