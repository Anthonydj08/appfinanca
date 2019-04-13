import { Component } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { NavController, ModalController, AlertController, ToastController, LoadingController } from '@ionic/angular';
import { Receita } from '../model/receita';
import { map } from 'rxjs/operators';
import { CadastroReceitaPage } from '../cadastro-receita/cadastro-receita.page';
import { Carteira } from './../model/carteira';
import { DBService } from './../services/db.service';

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

  constructor(public modalController: ModalController, private dbService: DBService, public toast: ToastController, public alertController: AlertController) {
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
      await this.loadCarteiraList();
      await this.loadReceitas();
      this.loadingLista = false;
    }
  }
  private async loadCarteiraList() {
    this.carteiraList = await this.dbService.listWithUIDs<Carteira>('/carteira');
  }

  private async loadReceitas() {
    this.dbService.listWithUIDs<Receita>('/receita')
      .then(receitas => {
        this.receitas = receitas;
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

  async edit(Receita: Receita) {
    const modal = await this.modalController.create({
      component: CadastroReceitaPage,
      componentProps: {
        editingReceita: Receita
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
