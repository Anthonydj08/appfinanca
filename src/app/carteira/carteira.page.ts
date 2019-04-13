import { Component, OnInit } from '@angular/core';
import { DBService } from './../services/db.service';
import { Carteira } from '../model/carteira';
import { ToastController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-carteira',
  templateUrl: './carteira.page.html',
  styleUrls: ['./carteira.page.scss'],
})
export class CarteiraPage{

  novaCarteira: Carteira;

  carteiras: Carteira[];

  loading: boolean;

  constructor( private dbService: DBService, private toast: ToastController, private alertController: AlertController) {
    this.novaCarteira = new Carteira();
    this.init();
  }

  private async init() {
    this.loading = true;

    await this.loadCarteiras();
  }
  private async loadCarteiras() {
    this.dbService.listWithUIDs<Carteira>('/carteira')
      .then(carteiras => {
        this.carteiras = carteiras;
        this.loading = false;
      }).catch(error => {
        console.log(error);
      });
  }

  insert() {
    this.dbService.insertInList<Carteira>('/carteira', this.novaCarteira)
      .then(() => {
        this.novaCarteira;
        this.init();
      }).catch(error => {
        console.log(error);
      });
  }
  

  async deleteMensagem(uid: string) {
    const alert = await this.alertController.create({
      header: 'Atenção',
      message: 'Deseja apagar a carteira? ',
      buttons: [
        {
          text: 'Cancelar',
          cssClass: 'secondary'
        },
        {
          text: 'Confirmar',
          handler: () => {
            this.remove(uid);
          }
        }
      ]
    });
    await alert.present();
  }

  remove(uid: string) {
    this.dbService.remove('/carteira', uid)
      .then(() => {
        this.presentToast('Carteira removida com sucesso');
        this.loadCarteiras();
      });
  }

  async presentToast(message: string) {
    const toast = await this.toast.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }



}
