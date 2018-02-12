import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Http, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class UsuarioProvider {
  myTempArray: (map: any) => any;
  private urlBase = "http://app.beercomigo.com/";
  public idUser:any
  constructor(private storage: Storage, public http: Http) {
  }

  setUserInfo(key:string, dataUser: any){
    dataUser = JSON.parse(JSON.stringify(dataUser));
    console.log("Estou setando storage",dataUser);
    var user={
      nome: dataUser.username,
      email: dataUser.email ,
      imagem: dataUser.picture,
      id : this.idUser
      };
     this.storage.set(key,user);
  }

  getUserIdHttp() {
    this.storage.get('cliente').then((val) => {
      this.getUserId(val.id).subscribe(
        data => {
          const response = (data as any);
          const objeto_retorno = JSON.parse(response._body);
          console.log(objeto_retorno);
          this.idUser = objeto_retorno['id_app_usuario'];
        }, error => {
          console.log(error);
        }
      )
    });
  }

  getUsuario(){
    return Promise.resolve(this.storage.get('cliente').then((val) => {
      console.log("getusuario",val);
      
    }));
  }
  getUserInfo(id) {
    return this.http.get(this.urlBase + "cliente/"+id);
  }
  getUserId(dsusuario) {
    return this.http.get(this.urlBase + "userid/"+dsusuario);
  }
  salvarUsuario(user: any) {

      this.setUserInfo('cliente',user);
      console.log("Passou daqui");
      let myHeaders = new Headers({
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
      });
      let options = new RequestOptions({
          headers: myHeaders
      });
        user = JSON.stringify(user);
        return new Promise((resolve, reject) => {
          let url = this.urlBase + "salvaruser";
          this.http.post(url, user,options)
            .subscribe((result: any) => {
              console.log(result);
            },
            (error) => {
              console.log(error);
            });
        });
      }
}
