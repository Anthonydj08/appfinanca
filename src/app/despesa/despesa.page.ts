import { Component } from '@angular/core';
import { Despesa } from '../model/despesa';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { ToastController, AlertController, ModalController, NavController } from '@ionic/angular';
import { map } from 'rxjs/operators';
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

  loading: boolean;

  constructor(public modalController: ModalController, private dbService: DBService, public toast: ToastController) {
    this.init();
  }

  private async init() {
    this.loading = true;

    await this.loadCarteiraList();
    await this.loadDespesas();
  }
  private async loadCarteiraList() {
    this.carteiraList = await this.dbService.listWithUIDs<Carteira>('/carteira');
  }

  private async loadDespesas() {
    this.dbService.listWithUIDs<Despesa>('/despesa')
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


  /*
  
    despesaDB: AngularFireList<Despesa>;
    despesa: Observable<Despesa[]>;
  
    constructor(public db: AngularFireDatabase,
      public navCtrl: NavController,
      public modalController: ModalController,
      public alertController: AlertController,
      public toast: ToastController
    ) {
      this.despesaDB = db.list<Despesa>('despesa');
      this.despesa = this.despesaDB.valueChanges();
      this.despesa = this.despesaDB.snapshotChanges().pipe(
        map(changes =>
          changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
        )
      );
      console.log(this.despesa);
    }
  
    async presentModal() {
      const modal = await this.modalController.create({
        component: CadastroDespesaPage
      });
  
      modal.onDidDismiss()
        .then(result => {
          if (result.data) {
            this.confirmAdd(result.data);
          }
        });
      return await modal.present();
    }
  
    private confirmAdd(despesa: Despesa) {
      this.despesaDB.push(despesa)
        .then(result => {
          this.presentToast("Despesa adicionada com sucesso.");
        }).catch(error => {
          this.presentToast("Erro ao adicionar a despesa.");
          console.log(error);
        });
    }
  
    async presentToast(mensagem: string) {
      const toast = await this.toast.create({
        message: mensagem,
        duration: 3000,
      });
      toast.present();
    }
  
    async deleteMensagem(key: string) {
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
              this.delete(key);
            }
          }
        ]
      });
      await alert.present();
    }
    delete(key: string) {
      this.despesaDB.remove(key)
        .then(result => {
          this.presentToast("Despesa removida com sucesso.");
        }).catch(error => {
          this.presentToast("Erro ao remover a despesa.");
          console.log(error);
        });
    }
  
  */
}
