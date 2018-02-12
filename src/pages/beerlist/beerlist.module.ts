import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BeerlistPage } from './beerlist';

@NgModule({
  declarations: [
    BeerlistPage,
  ],
  imports: [
    IonicPageModule.forChild(BeerlistPage),
  ],
})
export class BeerlistPageModule {}
