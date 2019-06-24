import { Component, OnInit, ViewChild } from '@angular/core';
import { LoadingController } from '@ionic/angular';

import { Platform } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  Environment,
  ILatLng,
  Spherical,
  Circle,
  MyLocation,
  GoogleMapsAnimation
} from '@ionic-native/google-maps';

@Component({
  selector: 'app-tela-mapa',
  templateUrl: './tela-mapa.page.html',
  styleUrls: ['./tela-mapa.page.scss'],
})
export class TelaMapaPage implements OnInit {

  @ViewChild('map_canvas') mapElement: any
  map: GoogleMap;
  latitude: any;
  longitude: any;
  loading: any;

  constructor(
    private platform: Platform,
    private geolocation: Geolocation,
    private loadingCtrl: LoadingController) { }

  async ngOnInit() {

    this.mapElement = this.mapElement.nativeElement;
    this.mapElement.style.width = this.platform.width() + "px";
    this.mapElement.style.height = this.platform.height() + "px";

    await this.platform.ready();
    await this.loadMap();
  }

  ngOnDestroy(){
    this.map.remove();
  }
  
  async loadMap() {
    this.loading = await this.loadingCtrl.create({ message: "Por favor, aguarde..." });
    await this.loading.present();

    Environment.setEnv({
      'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyAmbIrpK3Zl0q7eATkOlBU0nUWINfSrflo',
      'API_KEY_FOR_BROWSER_DEBUG': 'AIzaSyAmbIrpK3Zl0q7eATkOlBU0nUWINfSrflo'
    });

    const mapOptions: GoogleMapOptions = {
      controls: {
        zoom: false
      }
    }

    this.map = GoogleMaps.create(this.mapElement, mapOptions);
    try {
      await this.map.one(GoogleMapsEvent.MAP_READY);
      //this.addOriginMarker();
      this.posicaoAtual();
    } catch (error) {
      console.log(error);
    } finally {
      this.loading.dismiss();
    }
  }
  async addOriginMarker() {
    try {
      const myLocation: MyLocation = await this.map.getMyLocation();

      await this.map.moveCamera({
        target: myLocation.latLng,
        zoom: 18
      });

      this.map.addMarkerSync({
        title: 'Origem',
        icon: '#000',
        animation: GoogleMapsAnimation.DROP,
        position: myLocation.latLng
      });
    } catch (error) {
      console.log(error);
    } finally {
      this.loading.dismiss();
    }
  }

  async posicaoAtual() {
    this.geolocation.getCurrentPosition().then((resp) => {
      let pos = {
        lat: resp.coords.latitude,
        lng: resp.coords.longitude
      };

      this.map.moveCamera({
        target: pos,
        zoom: 18
      });

      this.map.addMarkerSync({
        title: 'Origem',
        icon: '#000',
        animation: GoogleMapsAnimation.DROP,
        position: pos
      });

    }).catch((error) => {
      console.log('Error getting location', error);
    });

  }

}
