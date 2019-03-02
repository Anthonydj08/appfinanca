import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Receita } from '../model/receita';

@Component({
  selector: 'app-cadastro-receita',
  templateUrl: './cadastro-receita.page.html',
  styleUrls: ['./cadastro-receita.page.scss'],
})
export class CadastroReceitaPage {

  novaReceita: Receita;
  constructor(public modalController: ModalController) {
    this.novaReceita = new Receita();
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
    if (!this.novaReceita.data) {
      this.novaReceita.data = this.startDate;
    } 
    this.modalController.dismiss(this.novaReceita);
    this.novaReceita = new Receita();
  }
}
