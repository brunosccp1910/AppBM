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
      id : this.idUser,
     
      };
     this.storage.set(key,user);
  }

  setUserHash(key:string, hash: any){
    hash = JSON.parse(JSON.stringify(hash));
    console.log("Estou setando storage",hash);
     this.storage.set(key,hash);
  }

  getUsuario(){
    return Promise.resolve(this.storage.get('hash').then((val) => {
      console.log("getusuario",val);
    }));
  }
  getUserInfo(hash) {
    return this.http.get(this.urlBase + "cliente/"+hash);
  }
  getUserId(dsusuario) {
    return this.http.get(this.urlBase + "userid/"+dsusuario);
  }
  salvarUsuario(user: any) {

      this.setUserInfo('hash',user);
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
