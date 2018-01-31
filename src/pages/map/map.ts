import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BeersPage } from '../beers/beers';
import {Platform} from "ionic-angular";
import {GoogleMaps, GoogleMap, LatLng, GoogleMapsEvent, GoogleMapOptions, CameraPosition, MarkerOptions, Marker, ILatLng} from "@ionic-native/google-maps";

declare var google;

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
  providers: [
    GoogleMaps
  ]
})
export class MapPage {
  //map: GoogleMap;
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  start = 'chicago, il';
  end = 'chicago, il';
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;
 
  constructor(
    private navCtrl: NavController,
    private googleMaps: GoogleMaps,
    private platform: Platform
  ) {}

  ionViewDidLoad(){
    console.log("Oi0");
    /*this.platform.ready().then(() => {
      console.log("Oi1");
      this.loadGoogleMap();
    });
    */
    this.initMap();  
  }
  initMap() {
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: 7,
      center: {lat: 41.85, lng: -87.65}
    });

    this.directionsDisplay.setMap(this.map);
  }
  loadGoogleMap(){
      console.log("Oi2");
      let mapOptions: GoogleMapOptions = {
        camera: {
          target: {
            lat: -2.4939506,
            lng: -44.2756008
          },
          zoom: 18,
          tilt: 30
        }
      };
      this.map = GoogleMaps.create('map_canvas', mapOptions);  
      console.log("Oi3");  
      this.map.one(GoogleMapsEvent.MAP_READY)
        .then(() => {
          console.log("Entrou");
          this.map.addMarker({
            title: 'Ionic',
            icon: 'blue',
            animation: 'DROP',
            position: {
              lat: -2.4939506,
              lng: -44.2756008
            }
          })
          .then(marker => {
            marker.on(GoogleMapsEvent.MARKER_CLICK)
              .subscribe(() => {
                alert('clicked');
              });
          });
  
        });
    }
    calculateAndDisplayRoute() {
      this.directionsService.route({
        origin: this.start,
        destination: this.end,
        travelMode: 'DRIVING'
      }, (response, status) => {
        if (status === 'OK') {
          this.directionsDisplay.setDirections(response);
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      });
    }
  
  
}
