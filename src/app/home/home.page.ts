import { Component, Input, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Receita } from '../model/receita';
import { Despesa } from '../model/despesa';
import { DBService } from '../services/db.service';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { timingSafeEqual } from 'crypto';
import { Carteira } from '../model/carteira';
import { Firebase } from '@ionic-native/firebase/ngx';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { CadastroDespesaPage } from '../cadastro-despesa/cadastro-despesa.page';
import { CadastroReceitaPage } from '../cadastro-receita/cadastro-receita.page';
import { EditaDespesaPage } from '../edita-despesa/edita-despesa.page';
import { EditaReceitaPage } from '../edita-receita/edita-receita.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  despesas: Despesa[];
  receitas: Receita[];
  carteiraList: Carteira[];
  loading: any;
  totalReceita: number = 0;
  totalDespesa: number = 0;
  saldo: number = 0;

  movimentos: any[];
  loadingLista: boolean;
  emailUsuario: String;
  data = new Date().getDate();
  constructor(public router: Router,
    private dbService: DBService,
    private fAuth: AngularFireAuth,
    private firebase: Firebase,
    public loadingController: LoadingController,
    public modalController: ModalController,
    public toast: ToastController,) {
    this.firebase.setScreenName("Home");
    this.init();
  }
  private async init() {
    this.loading = true;
    await this.presentLoading();
    this.dbService.listAndWatch('/despesa')
      .subscribe(data => this.initData());

    this.dbService.listAndWatch('/receita')
      .subscribe(data => this.initData());
    await this.loading.dismiss();
  }

  private async initData() {

    if (!this.loadingLista) {
      this.loadingLista = true;
      this.emailUsuario = this.fAuth.auth.currentUser.email;
      await this.loadCarteiraList();
      await this.loadDespesas();
      await this.loadReceitas();
      await this.totalDespesas();
      await this.totalReceitas();
      await this.totalSaldo();
      this.movimentos = this.despesas.concat(this.receitas);
      console.log(this.movimentos);
      
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
        this.loading = false;
      }).catch(error => {
        console.log(error);
      });
  }

  private async loadDespesas() {
    await this.dbService.listWithUIDs<Despesa>('/despesa')
      .then(despesas => {
        this.despesas = despesas.filter(d => this.carteiraList.some(c => c.uid === d.carteiraUID));
        this.loading = false;
      }).catch(error => {
        console.log(error);
      });
  }

  private totalDespesas() {
    this.totalDespesa = 0;
    for (let index = 0; index < this.despesas.length; index++) {
      this.totalDespesa = this.totalDespesa + this.despesas[index].valor;
    }
    return this.totalDespesa;
  }
  private totalReceitas() {
    this.totalReceita = 0;
    for (let index = 0; index < this.receitas.length; index++) {
      this.totalReceita = this.totalReceita + this.receitas[index].valor;
    }
    return this.totalReceita;
  }
  async openMovimento(movimento: any) {
    console.log(movimento);
    if (movimento.tipo == "receita") {
      const modal = await this.modalController.create({
        component: EditaReceitaPage,
        componentProps: {
          editingReceita: movimento
        }
      });

      modal.onDidDismiss()
        .then(result => {
          if (result.data) {
            this.presentToast('Receita editada com sucesso');
          }
        });

      return await modal.present();

    } else if (movimento.tipo == "despesa") {
      const modal = await this.modalController.create({
        component: EditaDespesaPage,
        componentProps: {
          editingDespesa: movimento
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
  }

  private totalSaldo() {
    this.saldo = this.totalReceita - this.totalDespesa;
  }

  async openModalDespesa() {
    const modal = await this.modalController.create({
      component: CadastroDespesaPage
    });

    modal.onDidDismiss()
      .then(result => {
        if (result.data) {
          this.presentToast('Despesa adicionada com sucesso');
        }
      });

    return await modal.present();
  }
  async openModalReceita() {
    const modal = await this.modalController.create({
      component: CadastroReceitaPage
    });

    modal.onDidDismiss()
      .then(result => {
        if (result.data) {
          this.presentToast('Receita adicionada com sucesso');
        }
      });

    return await modal.present();
  }

  openDespesa() {
    this.router.navigate(['/tabs/despesa']);
  }
  openReceita() {
    this.router.navigate(['/tabs/receita']);
  }

  async presentToast(message: string) {
    const toast = await this.toast.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Carregando',
      translucent: false,
      spinner: "dots",
    });
    return this.loading.present();
  }
}
