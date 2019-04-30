import { Component, OnInit } from '@angular/core';
import { DBService } from './../services/db.service';
import { Carteira } from '../model/carteira';
import { ToastController, AlertController } from '@ionic/angular';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-carteira',
  templateUrl: './carteira.page.html',
  styleUrls: ['./carteira.page.scss'],
})
export class CarteiraPage{

  novaCarteira: Carteira;
  carteiras: Carteira[];
  emailUsuario: string;
  loading: boolean;

  constructor( private dbService: DBService, private toast: ToastController, private alertController: AlertController,private afAuth: AngularFireAuth, ) {
    this.novaCarteira = new Carteira();
    this.init();
  }

  private async init() {
    this.loading = true;

    this.emailUsuario = this.afAuth.auth.currentUser.email;
    await this.loadCarteiras();
  }

  private async loadCarteiras() {
    await this.dbService.search<Carteira>('/carteira',  'usuarioEmail', this.emailUsuario)
    .then(carteiras => {
      this.carteiras = carteiras;
      this.loading = false;
    }).catch(error => {
      console.log(error);
    });
  }

  insert() {
    this.novaCarteira.usuarioEmail = this.emailUsuario;
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
