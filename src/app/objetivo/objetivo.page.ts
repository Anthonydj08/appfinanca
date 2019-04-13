import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { NavController, ModalController, AlertController, ToastController } from '@ionic/angular';
import { Objetivo } from '../model/objetivo';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CadastroObjetivoPage } from './../cadastro-objetivo/cadastro-objetivo.page';
import { DBService } from './../services/db.service';

@Component({
  selector: 'app-objetivo',
  templateUrl: './objetivo.page.html',
  styleUrls: ['./objetivo.page.scss'],
})
export class ObjetivoPage {
  
  objetivos: Objetivo[];
  loading: boolean;

  constructor(public modalController: ModalController, private dbService: DBService, public toast: ToastController, public alertController: AlertController) {
    this.init();
  }

  private async init() {
    this.loading = true;
    await this.loadObjetivos();
  }

  private async loadObjetivos() {
    this.dbService.listWithUIDs<Objetivo>('/objetivo')
      .then(objetivos => {
        this.objetivos = objetivos;
        this.loading = false;
      }).catch(error => {
        console.log(error);
      });
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

  async edit(Objetivo: Objetivo) {
    const modal = await this.modalController.create({
      component: CadastroObjetivoPage,
      componentProps: {
        editingObjetivo: Objetivo
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
  objetivoDB: AngularFireList<Objetivo>;
  objetivo: Observable<Objetivo[]>;


  constructor(public db: AngularFireDatabase,
    public navCtrl: NavController,
    public modalController: ModalController,
    public alertController: AlertController,
    public toast: ToastController, ) {

    this.objetivoDB = db.list<Objetivo>('objetivo');

    this.objetivo = this.objetivoDB.valueChanges();
    //Deletar dado
    this.objetivo = this.objetivoDB.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
  }
 
  async presentModal() {
    const modal = await this.modalController.create({
      component: CadastroObjetivoPage
    });

    modal.onDidDismiss()
      .then(result => {
        if (result.data) {
          this.confirmAdd(result.data);
        }
      });
    return await modal.present();
  }
  private confirmAdd(objetivo: Objetivo) {
    this.objetivoDB.push(objetivo)
      .then(result => {
        this.presentToast("Objetivo adicionado com sucesso.");
      }).catch(error => {
        this.presentToast("Erro ao adicionar o objetivo.");
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
      message: 'Deseja apagar o objetivo? ',
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
    this.objetivoDB.remove(key)
      .then(result => {
        this.presentToast("Receita removida com sucesso.");
      }).catch(error => {
        this.presentToast("Erro ao remover a receita.");
        console.log(error);
      });
  }
*/
}
