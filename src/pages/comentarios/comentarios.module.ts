import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComentariosPage } from './comentarios';
import { Ionic2RatingModule } from "ionic2-rating";


@NgModule({
  declarations: [
    ComentariosPage,
  ],
  imports: [
    IonicPageModule.forChild(ComentariosPage),
    Ionic2RatingModule
  ],
})
export class ComentariosPageModule {}
