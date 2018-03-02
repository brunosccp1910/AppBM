import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HttpClientModule } from '@angular/common/http'; 
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FeedPageModule } from '../pages/feed/feed.module';
import { IntroPageModule } from '../pages/intro/intro.module';
import { BeersPage } from '../pages/beers/beers';
import { CervejasProvider } from '../providers/cervejas/cervejas';
import { Storage, IonicStorageModule } from '@ionic/storage';
import { Ionic2RatingModule } from 'ionic2-rating';
import { UsuarioProvider } from '../providers/usuario/usuario';

import { MapPage } from '../pages/map/map';
import { Facebook } from '@ionic-native/facebook';
import { UserPageModule } from '../pages/user/user.module';
import { FeedPage } from '../pages/feed/feed';
import { UserPage } from '../pages/user/user';
import { ComentariosPage } from '../pages/comentarios/comentarios';
import { Geolocation } from '@ionic-native/geolocation'
import { Device } from '@ionic-native/device';
import { BeerlistPage } from '../pages/beerlist/beerlist';
import { BeerlistPageModule } from '../pages/beerlist/beerlist.module';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';

import { ComentarioAvaliacaoPage } from '../pages/comentario-avaliacao/comentario-avaliacao';
import { BeerdetailPage } from '../pages/beerdetail/beerdetail';



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    BeersPage,
    BeerlistPage,
    BeerdetailPage,
    ComentariosPage,
    MapPage,
    ComentarioAvaliacaoPage

  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    FeedPageModule,
    UserPageModule,
    IntroPageModule,
    Ionic2RatingModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    FeedPage,
    UserPage,
    BeersPage,
    BeerlistPage,
    BeerdetailPage,
    ComentariosPage,
    MapPage,
    ComentarioAvaliacaoPage

  ],
  providers: [
    StatusBar,
    SplashScreen,
    UsuarioProvider,
    Geolocation,
    LaunchNavigator,
    Facebook,
    Device,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
    
  ]
})
export class AppModule {}
