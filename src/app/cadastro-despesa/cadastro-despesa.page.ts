import { Component, OnInit } from '@angular/core';
import { Despesa } from '../model/despesa';
import { ModalController } from '@ionic/angular';
import { Carteira } from '../model/carteira';
import { DBService } from './../services/db.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Categoria } from './../model/categoria';

@Component({
  selector: 'app-cadastro-despesa',
  templateUrl: './cadastro-despesa.page.html',
  styleUrls: ['./cadastro-despesa.page.scss'],
})
export class CadastroDespesaPage {

  date: string;
  novaDespesa: Despesa;
  carteiraList: Carteira[];
  emailUsuario: string;
  categoriaList: Categoria[];

  constructor(public modalController: ModalController, private dbService: DBService, private afAuth: AngularFireAuth, ) {
    this.novaDespesa = new Despesa();
    this.novaDespesa.tipo = "despesa";
    this.emailUsuario = this.afAuth.auth.currentUser.email;
    this.loadCarteiraList();
    this.loadCategoriaList();
    this.date = new Date().toISOString();
  }

  customAlertCategoria: any = {
    header: 'Categorias',
    mode: 'ios',
  };
  customPopoverCarteira: any = {
    header: 'Carteiras',
    mode: 'ios',
  };


  private async loadCarteiraList() {
    this.carteiraList = await this.dbService.search<Carteira>('/carteira', 'usuarioEmail', this.emailUsuario);
  }

  private async loadCategoriaList(){
    this.categoriaList = await this.dbService.search<Categoria>('/categoria', 'tipo', 'Despesa');
  }

  voltar() {
    this.modalController.dismiss();
  }

  salvar() {
    this.novaDespesa.data = new Date(this.date).getTime();
    this.dbService.insertInList<Despesa>('/despesa', this.novaDespesa)
      .then(() => {
        this.modalController.dismiss(this.novaDespesa);
      }).catch(error => {
        console.log(error);
      });
  }
}
