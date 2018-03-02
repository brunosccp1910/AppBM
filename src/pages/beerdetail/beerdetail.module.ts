import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BeerdetailPage } from './beerdetail';

@NgModule({
  declarations: [
    BeerdetailPage,
  ],
  imports: [
    IonicPageModule.forChild(BeerdetailPage),
  ],
})
export class BeerdetailPageModule {}
