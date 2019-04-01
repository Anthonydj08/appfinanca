import { Component, OnInit } from '@angular/core';
import { Despesa } from '../model/despesa';
import { ModalController } from '@ionic/angular';
import { Carteira } from '../model/carteira';
import { DBService } from './../services/db.service';

@Component({
  selector: 'app-cadastro-despesa',
  templateUrl: './cadastro-despesa.page.html',
  styleUrls: ['./cadastro-despesa.page.scss'],
})
export class CadastroDespesaPage implements OnInit {

  editaDespesa: Despesa;

  novaDespesa: Despesa;

  carteiraList: Carteira[];

  startDate = new Date().toISOString();
  maxDate = new Date().toISOString();

  constructor(public modalController: ModalController, private dbService: DBService) {
    this.novaDespesa = new Despesa();
    this.loadCarteiraList();
  }

  ngOnInit() {
    if (this.editaDespesa) {
      this.novaDespesa = this.editaDespesa;
    }
  }
  private async loadCarteiraList() {
    this.carteiraList = await this.dbService.listWithUIDs<Carteira>('/carteira');
}

  customAlertOptions: any = {
    header: 'Categorias',
    mode: 'ios',
  };

  voltar() {
    this.modalController.dismiss();
  }
  salvar() {
    if (this.editaDespesa) {
      this.editar();
    } else {
      this.inserir();
    }
  }

  private editar() {
    const updatingObject = { nome: this.novaDespesa.nome, categoria: this.novaDespesa.categoria, valor: this.novaDespesa.valor, data: this.novaDespesa.data, carteiraUID: this.novaDespesa.carteiraUID };
    this.dbService.update('/despesa', updatingObject)
      .then(() => {
        this.modalController.dismiss(this.novaDespesa);
      }).catch(error => {
        console.log(error);
      });
  }

  private inserir() {
    this.dbService.insertInList<Despesa>('/despesa', this.novaDespesa)
      .then(() => {
        this.modalController.dismiss(this.novaDespesa);
      }).catch(error => {
        console.log(error);
      });
  }

}
