import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { DBService } from '../services/db.service';
import { Objetivo } from '../model/objetivo';
import { Transacao } from './../model/transacao';
import { EditaObjetivoPage } from '../edita-objetivo/edita-objetivo.page';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-tela-objetivo',
  templateUrl: './tela-objetivo.page.html',
  styleUrls: ['./tela-objetivo.page.scss'],
})
export class TelaObjetivoPage implements OnInit {

  date: string;
  showObjetivo: Objetivo;

  novaTransacao: Transacao;
  transacoes: Transacao[];
  objetivo: Objetivo[];
  total: number;
  loadingLista: boolean;
  emailUsuario: string;

  constructor(public modalController: ModalController, private dbService: DBService, public toast: ToastController, private afAuth: AngularFireAuth) {
    this.emailUsuario = this.afAuth.auth.currentUser.email;
    this.novaTransacao = new Transacao();
    this.date = new Date().toISOString();
    this.init();
  }

  private async init() {
    this.dbService.listAndWatch('/transacao')
      .subscribe(data => this.initData());
  }

  private async initData() {
    if (!this.loadingLista) {
      this.loadingLista = true;
      await this.loadObjetivoList();
     
      await this.loadTransacao();
      this.associateObjetivoAndTransacao();
      await this.totalTransacao();
      
      this.loadingLista = false;
    }
  }
  
  ngOnInit() {

  }

  private associateObjetivoAndTransacao() {
    this.objetivo.forEach(Objetivo => {
      const objetivoTransacao = this.transacoes.filter(a => a.objetivoUID === Objetivo.uid)[0];
      Objetivo['transacaoText'] = objetivoTransacao.valor;
    });
  }

  private async loadObjetivoList() {
    this.objetivo = await this.dbService.search<Objetivo>('/objetivo', 'usuarioEmail', this.emailUsuario);
  }

  private async loadTransacao() {
    await this.dbService.listWithUIDs<Transacao>('/transacao')
      .then(transacoes => {
        this.transacoes = transacoes.filter(d => this.objetivo.some(c => c.uid === d.objetivoUID));;
      }).catch(error => {
        console.log(error);
      });
  }

  private totalTransacao() {
    this.total = 0;
    for (let index = 0; index < this.transacoes.length; index++) {
      this.total = this.total + this.transacoes[index].valor;
    }
    return this.total;
  }

  private inserirTransacao() {
    this.novaTransacao.data = new Date(this.date).getTime();
    this.novaTransacao.objetivoUID = this.showObjetivo.uid;
    this.dbService.insertInList<Transacao>('/transacao', this.novaTransacao)
      .then(() => {
        this.novaTransacao;
        this.ngOnInit();
      }).catch(error => {
        console.log(error);
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
      component: EditaObjetivoPage,
      componentProps: {
        editingObjetivo: Objetivo
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
    console.log(this.transacoes);

  }

}
