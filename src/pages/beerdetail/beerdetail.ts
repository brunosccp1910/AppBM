import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CervejasProvider } from '../../providers/cervejas/cervejas';
import { Storage } from '@ionic/storage';
import { LoadingController } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-beerdetail',
  templateUrl: 'beerdetail.html',
  providers: [
    CervejasProvider
  ]
})
export class BeerdetailPage {

  public idcerveja:any;
  public cerveja = new Array<any>();

  public comentarios = new Array<any>();
  public userdata = new Array<any>();



  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public cervejaProvider: CervejasProvider,
              public storage: Storage,
              public loading: LoadingController)
  {
    this.idcerveja = this.navParams.get('cerveja');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BeerdetailPage',this.cerveja);
    this.storage.get('hash').then((val) => {
      this.userdata = val;
      this.atualizarTela();
    });        }

  atualizarTela() {//modificado
    let loader = this.loading.create({
      content: 'Obtendo informações',
    });
    loader.present().then(() => { });
   
    this.cervejaProvider.getCervejaById(this.idcerveja).subscribe(
      data => {
        const response = (data as any);
        const objeto_retorno = JSON.parse(response._body);
        console.log('Cerveja',objeto_retorno);   

          if (objeto_retorno.avaliacao == null) {
            objeto_retorno.tipo_estrela = "star-outline";
            objeto_retorno.avaliacao = "Sem avaliação";
          } else {
            objeto_retorno.avaliacao = parseFloat(objeto_retorno.avaliacao).toFixed(2);
            if (parseInt(objeto_retorno.avaliacao) != objeto_retorno.avaliacao)
              objeto_retorno.tipo_estrela = "star-half";
            else
              objeto_retorno.tipo_estrela = "star";
          }
          if(objeto_retorno.ds_estado!=null){
            objeto_retorno.im_pais = objeto_retorno.im_estado;
            objeto_retorno.ds_pais = objeto_retorno.ds_estado;
          }   
          this.cerveja.push(objeto_retorno);
          this.cerveja = this.cerveja[0];
        console.log('Cerveja',this.cerveja);   
        this.cervejaProvider.getComentario(this.idcerveja,this.userdata['hash']).subscribe(
          data => {
            const response = (data as any);
            const objeto_retorno = JSON.parse(response._body);
            this.comentarios = objeto_retorno.comentarios;
            console.log('Comentarios',this.comentarios);      
          }, error => {
            console.log(error);
          }
        )   
        loader.dismiss();
      }, error => {
        console.log(error);
      }
    )
    this.storage.get('hash').then((val) => {
      this.userdata = val;
      console.log(this.userdata);
    });
  }


}
