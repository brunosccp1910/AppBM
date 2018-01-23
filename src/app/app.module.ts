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
import { CervejaDetalhePage } from '../pages/cerveja-detalhe/cerveja-detalhe';
import { Storage, IonicStorageModule } from '@ionic/storage';
import { Ionic2RatingModule } from 'ionic2-rating';
import { UsuarioProvider } from '../providers/usuario/usuario';

import { GoogleMaps } from '@ionic-native/google-maps';
import { MapPage } from '../pages/map/map';
import { Facebook } from '@ionic-native/facebook';
import { UserPageModule } from '../pages/user/user.module';
import { FeedPage } from '../pages/feed/feed';
import { UserPage } from '../pages/user/user';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    BeersPage,
    CervejaDetalhePage,
    MapPage
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
    CervejaDetalhePage,
    MapPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    UsuarioProvider,
    GoogleMaps,
    Facebook,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
    
  ]
})
export class AppModule {}
