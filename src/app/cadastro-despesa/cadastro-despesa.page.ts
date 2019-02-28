import { Component} from '@angular/core';
import { Despesa } from '../model/despesa';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-cadastro-despesa',
  templateUrl: './cadastro-despesa.page.html',
  styleUrls: ['./cadastro-despesa.page.scss'],
})
export class CadastroDespesaPage {

  novaDespesa: Despesa;

  constructor(public modalController: ModalController) {
    this.novaDespesa = new Despesa();
  }
  
  startDate = new Date().toISOString();
  maxDate = new Date().toISOString();

  customActionSheetOptions: any = {
    header: 'Categorias',
  };

  voltar() {
    this.modalController.dismiss();
  }
  salvar() {
    if (!this.novaDespesa.data) {
      this.novaDespesa.data = this.startDate;
    }   
    this.modalController.dismiss(this.novaDespesa);
    this.novaDespesa = new Despesa();
  }

}
