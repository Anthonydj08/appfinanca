import { Component, OnInit, ViewChild } from '@angular/core';
import { Despesa } from '../model/despesa';
import { ModalController, LoadingController, ToastController } from '@ionic/angular';
import { Carteira } from '../model/carteira';
import { DBService } from './../services/db.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Categoria } from './../model/categoria';

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
import { RepeatPipe } from 'ngx-pipes';
import { TelaMapaPage } from '../tela-mapa/tela-mapa.page';

@Component({
  selector: 'app-cadastro-despesa',
  templateUrl: './cadastro-despesa.page.html',
  styleUrls: ['./cadastro-despesa.page.scss'],
})
export class CadastroDespesaPage implements OnInit {

  @ViewChild('map_canvas') mapElement: any
  date: string;
  novaDespesa: Despesa;
  carteiraList: Carteira[];
  emailUsuario: string;
  categoriaList: Categoria[];
  map: GoogleMap;
  latitude: any;
  longitude: any;
  loading: any;

  constructor(private platform: Platform,
    public modalController: ModalController,
    private dbService: DBService,
    private afAuth: AngularFireAuth,
    private geolocation: Geolocation,
    private loadingCtrl: LoadingController,
    public toast: ToastController,) {

    this.novaDespesa = new Despesa();
    this.novaDespesa.tipo = "despesa";
    this.emailUsuario = this.afAuth.auth.currentUser.email;
    this.loadCarteiraList();
    this.loadCategoriaList();
    this.date = new Date().toISOString();

  }

  async ngOnInit() {
    this.mapElement = this.mapElement.nativeElement;
    this.mapElement.style.width = 100 + "%";
    this.mapElement.style.height = 250 + "px";

    await this.platform.ready();
    await this.loadMap();
  }

  customAlertCategoria: any = {
    header: 'Categorias',
    mode: 'ios',
  };
  customPopoverCarteira: any = {
    header: 'Carteiras',
    mode: 'ios',
  };

  private async loadCarteiraList() {
    this.carteiraList = await this.dbService.search<Carteira>('/carteira', 'usuarioEmail', this.emailUsuario);
  }

  private async loadCategoriaList() {
    this.categoriaList = await this.dbService.search<Categoria>('/categoria', 'tipo', 'Despesa');
  }

  voltar() {
    this.modalController.dismiss();
  }

  async openModalMapa() {
    const modal = await this.modalController.create({
      component: TelaMapaPage
    });

    modal.onDidDismiss()
      .then(result => {
        if (result.data) {
          this.presentToast('Mapa adicionado');
        }
      });

    return await modal.present();
  }

  async presentToast(message: string) {
    const toast = await this.toast.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  salvar() {
    this.novaDespesa.data = new Date(this.date).getTime();
    this.dbService.insertInList<Despesa>('/despesa', this.novaDespesa)
      .then(() => {
        this.modalController.dismiss(this.novaDespesa);
      }).catch(error => {
        console.log(error);
      });
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
