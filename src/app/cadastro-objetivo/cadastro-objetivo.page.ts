import { Component, OnInit } from '@angular/core';
import { Objetivo } from '../model/objetivo';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-cadastro-objetivo',
  templateUrl: './cadastro-objetivo.page.html',
  styleUrls: ['./cadastro-objetivo.page.scss'],
})
export class CadastroObjetivoPage {

  novoObjetivo: Objetivo;

  constructor(public modalController: ModalController) {
    this.novoObjetivo = new Objetivo();
  }
  
  startDate = new Date().toISOString();
  maxDate = new Date().toISOString();

  customAlertOptions: any = {
    header: 'Categorias',
    mode: 'ios',
  };

  voltar() {
    this.modalController.dismiss();
  }
  salvar() {
    if (!this.novoObjetivo.data) {
      this.novoObjetivo.data = this.startDate;
    }   
    this.modalController.dismiss(this.novoObjetivo);
    this.novoObjetivo = new Objetivo();
  }
}
