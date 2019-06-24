import { Component, OnInit } from '@angular/core';
import { Receita } from '../model/receita';
import { ModalController, ToastController } from '@ionic/angular';
import { EditaReceitaPage } from './../edita-receita/edita-receita.page';
import { ScrollDetail } from '@ionic/core';
import { Carteira } from '../model/carteira';
import { DBService } from './../services/db.service';
import { AngularFireAuth } from 'angularfire2/auth';
@Component({
  selector: 'app-tela-receita',
  templateUrl: './tela-receita.page.html',
  styleUrls: ['./tela-receita.page.scss'],
})
export class TelaReceitaPage implements OnInit {

  date: string;
  showReceita: Receita;
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
    this.carteiraList = await this.dbService.search<Carteira>('/carteira', 'uid', this.showReceita.carteiraUID);
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

  async edit(Receita: Receita) {
    const modal = await this.modalController.create({
      component: EditaReceitaPage,
      componentProps: {
        editingReceita: Receita
      }
    });

    modal.onDidDismiss()
      .then(result => {
        if (result.data) {
          this.presentToast('Receita editada com sucesso');
        }
      });

    return await modal.present();
  }

  voltar() {
    this.modalController.dismiss();
  }
}
