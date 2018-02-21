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

  setUserInfo(key:string, dataUser: any,hash: any){
    dataUser = JSON.parse(JSON.stringify(dataUser));
    console.log("Estou setando storage",dataUser);
    var user={
      hash:hash,
      nome: dataUser.username,
      email: dataUser.email ,
      imagem: dataUser.picture     
      };
     this.storage.set(key,user);
  }


  getUsuario(){
    return Promise.resolve(this.storage.get('hash').then((val) => {
      console.log("getusuario",val);
    }));
  }
  getUserInfo(hash) {
    return this.http.get(this.urlBase + "cliente/"+hash);
  }
  getCervejasProvadas(hash) {
    return this.http.get(this.urlBase + "usuario/provou/"+hash);
  }
  getUserId(dsusuario) {
    return this.http.get(this.urlBase + "userid/"+dsusuario);
  }
  salvarUsuario(user: any) {
      var userhashinfo = user;
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
              const response = (result as any);
              const objeto_retorno = JSON.parse(response._body);
              console.log(objeto_retorno[0]['token']);
              this.setUserInfo('hash',userhashinfo,objeto_retorno[0]['token']);
            },
            (error) => {
              console.log(error);
            });
        });
      }
}
