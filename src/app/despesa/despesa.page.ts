import { Component } from '@angular/core';
import { Despesa } from '../model/despesa';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { ToastController, AlertController, ModalController, NavController } from '@ionic/angular';
import { map } from 'rxjs/operators';
import { CadastroDespesaPage } from '../cadastro-despesa/cadastro-despesa.page';

@Component({
  selector: 'app-despesa',
  templateUrl: './despesa.page.html',
  styleUrls: ['./despesa.page.scss'],
})
export class DespesaPage {

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
}
