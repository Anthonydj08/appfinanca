import { Component } from '@angular/core';
import { Despesa } from '../model/despesa';
import { ToastController, AlertController, ModalController } from '@ionic/angular';
import { CadastroDespesaPage } from '../cadastro-despesa/cadastro-despesa.page';
import { Carteira } from './../model/carteira';
import { DBService } from './../services/db.service';

@Component({
  selector: 'app-despesa',
  templateUrl: './despesa.page.html',
  styleUrls: ['./despesa.page.scss'],
})
export class DespesaPage {

  carteiraList: Carteira[];
  despesas: Despesa[];
  despesa: Despesa;
  loading: boolean;
  loadingLista: boolean;

  constructor(public modalController: ModalController, private dbService: DBService, public toast: ToastController, public alertController: AlertController) {
    this.init();
  }

  private async init() {
    this.loading = true;


    this.dbService.listAndWatch('/despesa')
      .subscribe(data => this.initData());

    this.dbService.listAndWatch('/carteira')
      .subscribe(data => this.initData());

  }

  private async initData() {
    if (!this.loadingLista) {
      this.loadingLista = true;
      await this.loadCarteiraList();
      await this.loadDespesas();
      this.loadingLista = false;
    }
  }
  private async loadCarteiraList() {
    this.carteiraList = await this.dbService.listWithUIDs<Carteira>('/carteira');
  }

  private async loadDespesas() {
    await this.dbService.listWithUIDs<Despesa>('/despesa')
      .then(despesas => {
        this.despesas = despesas;
        this.associateDespesaAndCarteira();
        this.loading = false;
      }).catch(error => {
        console.log(error);
      });
  }

  private associateDespesaAndCarteira() {
    this.despesas.forEach(despesa => {
      const despesaCarteira = this.carteiraList.filter(a => a.uid === despesa.carteiraUID)[0];

      despesa['carteiraText'] = despesaCarteira.nome;
    });
  }


  async add() {
    const modal = await this.modalController.create({
      component: CadastroDespesaPage
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
    this.presentToast('Despesa adicionada com sucesso');
    this.loadDespesas();
  }

  async deleteMensagem(uid: string) {
    const alert = await this.alertController.create({
      header: 'Atenção',
      message: 'Deseja apagar a despesa? ',
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
    this.dbService.remove('/despesa', uid)
      .then(() => {
        this.presentToast('Despesa removida com sucesso');
        this.loadDespesas();
      });
  }

  async presentToast(message: string) {
    const toast = await this.toast.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  async edit(despesa: Despesa) {
    const modal = await this.modalController.create({
      component: CadastroDespesaPage,
      componentProps: {
        editingDespesa: despesa
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
