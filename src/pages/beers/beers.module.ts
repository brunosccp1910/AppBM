import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BeersPage } from './beers';
import { Ionic2RatingModule } from "ionic2-rating";


@NgModule({
  declarations: [
    BeersPage,
  ],
  imports: [
    IonicPageModule.forChild(BeersPage),
    Ionic2RatingModule
  ],

  

})
export class BeersPageModule {
 

}
