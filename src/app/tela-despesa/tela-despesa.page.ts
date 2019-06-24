import { Component, OnInit } from '@angular/core';
import { Despesa } from './../model/despesa';
import { Carteira } from './../model/carteira';
import { ScrollDetail } from '@ionic/core';
import { ModalController, ToastController } from '@ionic/angular';
import { DBService } from '../services/db.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { EditaDespesaPage } from '../edita-despesa/edita-despesa.page';
@Component({
  selector: 'app-tela-despesa',
  templateUrl: './tela-despesa.page.html',
  styleUrls: ['./tela-despesa.page.scss'],
})
export class TelaDespesaPage implements OnInit {

  date: string;
  showDespesa: Despesa;
  showToolbar = false;
  carteiraList: Carteira[];
  emailUsuario: string;
  nomeCarteira: string;

  onScroll($event: CustomEvent<ScrollDetail>) {
    if ($event && $event.detail && $event.detail.scrollTop) {
      const scrollTop = $event.detail.scrollTop;
      this.showToolbar = scrollTop >= 100;
    }
  }

  constructor(public modalController: ModalController, public toast: ToastController, public dbService: DBService, public afAuth: AngularFireAuth) {
    this.emailUsuario = this.afAuth.auth.currentUser.email;
    this.loadCarteiraList();
  }

  ngOnInit() {
  }

  private async loadCarteiraList() {
    this.carteiraList = await this.dbService.search<Carteira>('/carteira', 'uid', this.showDespesa.carteiraUID);
    this.nomeCarteira = this.carteiraList[0].nome
    console.log(this.nomeCarteira);

  }

  async presentToast(message: string) {
    const toast = await this.toast.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  async edit(Despesa: Despesa) {
    const modal = await this.modalController.create({
      component: EditaDespesaPage,
      componentProps: {
        editingDespesa: Despesa
      }
    });

    modal.onDidDismiss()
      .then(result => {
        if (result.data) {
          this.presentToast('Despesa editada com sucesso');
        }
      });

    return await modal.present();
  }

  voltar() {
    this.modalController.dismiss();
  }
}
