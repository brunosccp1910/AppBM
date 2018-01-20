import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CervejaDetalhePage } from './cerveja-detalhe';

@NgModule({
  declarations: [
    CervejaDetalhePage,
  ],
  imports: [
    IonicPageModule.forChild(CervejaDetalhePage),
  ],
})
export class CervejaDetalhePageModule {}
