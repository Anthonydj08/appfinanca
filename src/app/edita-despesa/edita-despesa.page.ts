import { Component, OnInit } from '@angular/core';
import { Despesa } from '../model/despesa';
import { Carteira } from '../model/carteira';
import { ModalController } from '@ionic/angular';
import { DBService } from '../services/db.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Categoria } from './../model/categoria';

@Component({
  selector: 'app-edita-despesa',
  templateUrl: './edita-despesa.page.html',
  styleUrls: ['./edita-despesa.page.scss'],
})
export class EditaDespesaPage implements OnInit {

  date: string;
  editingDespesa: Despesa;
  novaDespesa: Despesa;
  carteiraList: Carteira[];
  categoriaList: Categoria[];
  emailUsuario: string;

  constructor(public modalController: ModalController, private dbService: DBService, private afAuth: AngularFireAuth) {
    this.emailUsuario = this.afAuth.auth.currentUser.email;
  }

  customAlertCategoria: any = {
    header: 'Categorias',
    mode: 'ios',
  };
  customPopoverCarteira: any = {
    header: 'Carteiras',
    mode: 'ios',
  };

  async ngOnInit() {
    await this.loadCategoriaList();
    await this.loadCarteiraList();

    if (this.editingDespesa) {
      this.novaDespesa = this.editingDespesa;
    }

    this.date = new Date(this.novaDespesa.data).toISOString();
  }
  private async loadCarteiraList() {
    this.carteiraList = await this.dbService.search<Carteira>('/carteira', 'usuarioEmail', this.emailUsuario);
  }

  private async loadCategoriaList() {
    this.categoriaList = await this.dbService.search<Categoria>('/categoria', 'tipo', 'Despesa');
  }

  editar() {
    const updatingObject = { nome: this.novaDespesa.nome, categoria: this.novaDespesa.categoria, valor: this.novaDespesa.valor, data: this.novaDespesa.data, carteiraUID: this.novaDespesa.carteiraUID };
    this.dbService.update('/despesa', this.novaDespesa.uid, updatingObject)
      .then(() => {
        this.modalController.dismiss(this.novaDespesa);
      }).catch(error => {
        console.log(error);
      });
  }

  voltar() {
    this.modalController.dismiss();
  }
}
