import { Component, OnInit } from '@angular/core';
import { Despesa } from '../model/despesa';
import { ModalController } from '@ionic/angular';
import { Carteira } from '../model/carteira';
import { DBService } from './../services/db.service';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-cadastro-despesa',
  templateUrl: './cadastro-despesa.page.html',
  styleUrls: ['./cadastro-despesa.page.scss'],
})
export class CadastroDespesaPage implements OnInit {

  date: string;
  editingDespesa: Despesa;
  novaDespesa: Despesa;
  carteiraList: Carteira[];
  emailUsuario: string;

  constructor(public modalController: ModalController, private dbService: DBService, private afAuth: AngularFireAuth, ) {
    this.novaDespesa = new Despesa();
    this.novaDespesa.tipo = "despesa";
    this.emailUsuario = this.afAuth.auth.currentUser.email;
    this.loadCarteiraList();
    this.date = new Date().toISOString();
  }

  customAlertCategoria: any = {
    header: 'Categorias',
    mode: 'ios',
  };
  customAlertCarteira: any = {
    header: 'Carteiras',
    mode: 'ios',
  };

  ngOnInit() {
    if (this.editingDespesa) {
      this.novaDespesa = this.editingDespesa;
    }
  }

  private async loadCarteiraList() {
    this.carteiraList = await this.dbService.search<Carteira>('/carteira', 'usuarioEmail', this.emailUsuario);
  }

  voltar() {
    this.modalController.dismiss();
  }

  salvar() {
    this.novaDespesa.data = new Date(this.date).getTime();
    if (this.editingDespesa) {
      this.editar();
    } else {
      this.inserir();
    }
  }

  private editar() {
    const updatingObject = { nome: this.novaDespesa.nome, categoria: this.novaDespesa.categoria, valor: this.novaDespesa.valor, data: this.novaDespesa.data, carteiraUID: this.novaDespesa.carteiraUID };
    this.dbService.update('/despesa', this.novaDespesa.uid, updatingObject)
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
