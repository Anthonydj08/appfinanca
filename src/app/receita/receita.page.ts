import { Component } from '@angular/core';
import { ModalController, AlertController, ToastController } from '@ionic/angular';
import { Receita } from '../model/receita';
import { CadastroReceitaPage } from '../cadastro-receita/cadastro-receita.page';
import { Carteira } from './../model/carteira';
import { DBService } from './../services/db.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { TelaReceitaPage } from '../tela-receita/tela-receita.page';

@Component({
  selector: 'app-receita',
  templateUrl: './receita.page.html',
  styleUrls: ['./receita.page.scss'],
})
export class ReceitaPage {

  carteiraList: Carteira[];
  receitas: Receita[];
  loading: boolean;
  loadingLista: boolean;
  emailUsuario: String;

  constructor(public modalController: ModalController,
    private dbService: DBService,
    public toast: ToastController,
    public alertController: AlertController,
    private afAuth: AngularFireAuth) {
    this.init();
  }

  private async init() {
    this.loading = true;

    this.dbService.listAndWatch('/carteira')
      .subscribe(data => this.initData());

    this.dbService.listAndWatch('/receita')
      .subscribe(data => this.initData());
  }
  private async initData() {
    if (!this.loadingLista) {
      this.loadingLista = true;
      this.emailUsuario = this.afAuth.auth.currentUser.email;
      await this.loadCarteiraList();
      await this.loadReceitas();
      this.loadingLista = false;
    }
  }
  private async loadCarteiraList() {
    this.carteiraList = await this.dbService.search<Carteira>('/carteira', 'usuarioEmail', this.emailUsuario);
  }

  private async loadReceitas() {
    await this.dbService.listWithUIDs<Receita>('/receita')
      .then(receitas => {
        this.receitas = receitas.filter(d => this.carteiraList.some(c => c.uid === d.carteiraUID));
        this.associateReceitaAndCarteira();
        this.loading = false;
      }).catch(error => {
        console.log(error);
      });
  }

  private associateReceitaAndCarteira() {
    this.receitas.forEach(Receita => {
      const receitaCarteira = this.carteiraList.filter(a => a.uid === Receita.carteiraUID)[0];
      Receita['carteiraText'] = receitaCarteira.nome;
    });
  }

  async add() {
    const modal = await this.modalController.create({
      component: CadastroReceitaPage
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
    this.presentToast('Receita adicionada com sucesso');
    this.loadReceitas();
  }

  async deleteMensagem(uid: string) {
    const alert = await this.alertController.create({
      header: 'Atenção',
      message: 'Deseja apagar a Receita? ',
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
    this.dbService.remove('/receita', uid)
      .then(() => {
        this.presentToast('Receita removida com sucesso');
        this.loadReceitas();
      });
  }

  async presentToast(message: string) {
    const toast = await this.toast.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  async mostra(Receita: Receita) {
    const modal = await this.modalController.create({
      component: TelaReceitaPage,
      componentProps: {
        showReceita: Receita
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
