import { Component, OnInit } from '@angular/core';
import { Objetivo } from '../model/objetivo';
import { ModalController } from '@ionic/angular';
import { DBService } from './../services/db.service';
import { Transacao } from '../model/transacao';

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

  constructor(public modalController: ModalController, private dbService: DBService) {
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

  salvar() {
    this.novoObjetivo.data = new Date(this.date).getTime();
    if (this.editingObjetivo) {
      this.editar();
    } else {
      this.inserir();
    }
  }

  private editar() {
    const updatingObject = { nome: this.novoObjetivo.nome, categoria: this.novoObjetivo.categoria, valor: this.novoObjetivo.valor, data: this.novoObjetivo.data, };
    this.dbService.update('/objetivo', this.novoObjetivo.uid, updatingObject)
      .then(() => {
        this.modalController.dismiss(this.novoObjetivo);
      }).catch(error => {
        console.log(error);
      });
  }

  private inserir() {
    this.novoObjetivo.data = new Date(this.date).getTime();
    this.dbService.insertInList<Objetivo>('/objetivo', this.novoObjetivo)
      .then(() => {
        this.modalController.dismiss(this.novoObjetivo);
      }).catch(error => {
        console.log(error);
      });
  }

  //inserir transação


  private inserirTransacao() {
    this.novaTransacao.data = new Date(this.date).getTime();
    this.novaTransacao.objetivoUID = this.editingObjetivo.uid;
    this.dbService.insertInList<Transacao>('/transacao', this.novaTransacao)
      .then(() => {
        this.novaTransacao;
        this.ngOnInit();
      }).catch(error => {
        console.log(error);
      });
  }

  //listar somente transacoes de determinado objetivo NAO FUNCIONA
  private listarObjetivo() {
    for (let index = 0; index < this.transacoes.length; index++) {
      if (this.transacoes[index].objetivoUID == this.objetivo[index].uid) {
        /////
      }
    }
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
