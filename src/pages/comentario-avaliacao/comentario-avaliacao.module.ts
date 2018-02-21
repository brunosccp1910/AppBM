import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Ionic2RatingModule } from "ionic2-rating";
import { ComentarioAvaliacaoPage } from './comentario-avaliacao';

@NgModule({
  declarations: [
    ComentarioAvaliacaoPage,
  ],
  imports: [
    IonicPageModule.forChild(ComentarioAvaliacaoPage),
    Ionic2RatingModule
  ],
  entryComponents: [
    ComentarioAvaliacaoPage,
  ]
})
export class ModalPageModule {}
