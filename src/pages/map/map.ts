import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BeersPage } from '../beers/beers';
import {Platform} from "ionic-angular";
import { Geolocation ,GeolocationOptions ,Geoposition ,PositionError } from '@ionic-native/geolocation'; 
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';

declare var google;

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
 
})
export class MapPage {
  //map: GoogleMap;
  @ViewChild('map') mapElement: ElementRef;
  map: any;

  public estabelecimento:any;
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;

  options : GeolocationOptions;
  currentPos : Geoposition;

  destination:string;
  start:string;
 
  constructor(
    private navCtrl: NavController,
    private platform: Platform,
    public navParams: NavParams,
    private geolocation : Geolocation,
    private launchnavigator: LaunchNavigator
  ) {
    this.estabelecimento = this.navParams.get('estabelecimento');

    this.start = "";
    this.destination = ""+this.estabelecimento['vl_latitude']+","+this.estabelecimento['vl_longitude']+"";
   

  }

  navigate(){
    let options: LaunchNavigatorOptions = {
      start: this.start,
      app: this.launchnavigator.APP.GOOGLE_MAPS

    };

    this.launchnavigator.navigate(this.destination, options)
        .then(
            success => alert('Launched navigator'),
            error => alert('Error launching navigator: ' + error)
    );
  }

  ionViewDidLoad(){
    this.getUserPosition(); 
    this.navigate(); 
  }
  initMap(lat,long ) {
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: 16,
      center: {lat: lat, lng: long}
    });
    console.log(lat,long);
    this.directionsDisplay.setMap(this.map);
    this.addMarker();
    this.calculateAndDisplayRoute();
  }
  
  calculateAndDisplayRoute() {
      var estabelecimento_position = new google.maps.LatLng(this.estabelecimento['vl_latitude'], this.estabelecimento['vl_longitude']);
      var mypos = new google.maps.LatLng(this.currentPos['coords']['latitude'], this.currentPos['coords']['longitude']);
      console.log('vj:',this.estabelecimento['vl_latitude'], this.estabelecimento['vl_longitude']);
      console.log('eu:',this.currentPos['coords']['latitude'], this.currentPos['coords']['longitude']);

      this.directionsService.route({
        origin: mypos,
        destination: estabelecimento_position,
        travelMode: 'DRIVING'
      }, (response, status) => {
        if (status === 'OK') {
          this.directionsDisplay.setDirections(response);
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      });
  }

  addMarker(){
      let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
      });
  
      let content = "<p>This is your current position !</p>";          
      let infoWindow = new google.maps.InfoWindow({
      content: content
      });
  
      google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
      });
  
  }
  getUserPosition(){
    this.options = {
    enableHighAccuracy : false
    };
    this.geolocation.getCurrentPosition(this.options).then((pos : Geoposition) => {

        this.currentPos = pos;     

        console.log(pos);
        this.initMap(pos.coords.latitude,pos.coords.longitude);

    },(err : PositionError)=>{
        console.log("error : " + err.message);
    ;
    })
}
  
  
}
