import { Component } from '@angular/core';
import { ModalController, AlertController, ToastController } from '@ionic/angular';
import { Objetivo } from '../model/objetivo';
import { CadastroObjetivoPage } from './../cadastro-objetivo/cadastro-objetivo.page';
import { DBService } from './../services/db.service';
import { TelaObjetivoPage } from '../tela-objetivo/tela-objetivo.page';
import { AngularFireAuth } from 'angularfire2/auth';
import { Transacao } from '../model/transacao';

@Component({
  selector: 'app-objetivo',
  templateUrl: './objetivo.page.html',
  styleUrls: ['./objetivo.page.scss'],
})
export class ObjetivoPage {

  objetivos: Objetivo[];
  loading: boolean;
  emailUsuario: string;
  total: number;
  transacoes: Transacao[];
  loadingLista: boolean;

  constructor(public modalController: ModalController,
    private dbService: DBService,
    public toast: ToastController,
    public alertController: AlertController,
    private afAuth: AngularFireAuth) {

    this.init();
  }

  private async init() {
    this.loading = true;
    if (!this.loadingLista) {
      this.loadingLista = true;
      this.emailUsuario = this.afAuth.auth.currentUser.email;
      await this.loadObjetivos();
      await this.loadTransacao();
      //await this.totalTransacao();
      this.loadingLista = false;
    }
  }

  private async loadObjetivos() {
    this.dbService.search<Objetivo>('/objetivo', 'usuarioEmail', this.emailUsuario)
      .then(objetivos => {
        this.objetivos = objetivos;
        this.loading = false;
      }).catch(error => {
        console.log(error);
      });
  }
  private async loadTransacao() {
    this.transacoes = await this.dbService.search<Transacao>('/transacao', 'objetivoUID', this.objetivos[0].uid);
    this.totalTransacao();

  }

  private totalTransacao() {
    this.total = 0;
    for (let index = 0; index < this.transacoes.length; index++) {
      this.total = this.total + this.transacoes[index].valor;
    }
    return this.total;
  }

  async add() {
    const modal = await this.modalController.create({
      component: CadastroObjetivoPage
    });

    modal.onDidDismiss()
      .then(result => {
        if (result.data) {
          this.confirmAdd();
        }
      });

    return await modal.present();
  }

  private confirmAdd() {
    this.presentToast('Objetivo adicionado com sucesso');
    this.loadObjetivos();
  }

  async deleteMensagem(uid: string) {
    const alert = await this.alertController.create({
      header: 'Atenção',
      message: 'Deseja apagar a Objetivo? ',
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
    this.dbService.remove('/objetivo', uid)
      .then(() => {
        this.presentToast('Objetivo removido com sucesso');
        this.loadObjetivos();
      });
  }

  async presentToast(message: string) {
    const toast = await this.toast.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  async mostra(Objetivo: Objetivo) {
    const modal = await this.modalController.create({
      component: TelaObjetivoPage,
      componentProps: {
        showObjetivo: Objetivo
      }
    });

    modal.onDidDismiss()
      .then(result => {
        if (result.data) {
          this.confirmAdd();
        }
      });

    return await modal.present();
  }

}
