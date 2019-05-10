import { Component, OnInit } from '@angular/core';
import { Objetivo } from '../model/objetivo';
import { ModalController } from '@ionic/angular';
import { DBService } from './../services/db.service';
import { Transacao } from '../model/transacao';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-cadastro-objetivo',
  templateUrl: './cadastro-objetivo.page.html',
  styleUrls: ['./cadastro-objetivo.page.scss'],
})
export class CadastroObjetivoPage {

  date: string;
  editingObjetivo: Objetivo;
  novoObjetivo: Objetivo;
  novaTransacao: Transacao;
  transacoes: Transacao[];
  objetivo: Objetivo[];
  total: number;
  loadingLista: boolean;
  emailUsuario: string;

  constructor(public modalController: ModalController, private dbService: DBService, private afAuth: AngularFireAuth,) {
    this.novoObjetivo = new Objetivo();
    this.novaTransacao = new Transacao();
    this.date = new Date().toISOString();
    this.init();
  }

  customAlertCategoria: any = {
    header: 'Categorias',
    mode: 'ios',
  };

  private async init() {
    this.emailUsuario = this.afAuth.auth.currentUser.email;
    this.dbService.listAndWatch('/transacao')
      .subscribe(data => this.initData());

  }
  private async initData() {
    await this.totalTransacao();
    if (!this.loadingLista) {
      this.loadingLista = true;
      await this.totalTransacao();
      this.loadingLista = false;
    }
  }
  ngOnInit() {
    if (this.editingObjetivo) {
      this.novoObjetivo = this.editingObjetivo;
      this.loadTransacao();
      this.init();
    }
  }

  voltar() {
    this.modalController.dismiss();
  }
 
  private salvar() {
    this.novoObjetivo.usuarioEmail = this.emailUsuario;
    this.novoObjetivo.data = new Date(this.date).getTime();
    this.dbService.insertInList<Objetivo>('/objetivo', this.novoObjetivo)
      .then(() => {
        this.modalController.dismiss(this.novoObjetivo);
      }).catch(error => {
        console.log(error);
      });
  }

  private async loadTransacao() {
    this.dbService.listWithUIDs<Transacao>('/transacao')
      .then(transacoes => {
        this.transacoes = transacoes;
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

}
