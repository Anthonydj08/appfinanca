import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DBService } from '../services/db.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Receita } from '../model/receita';
import { Carteira } from '../model/carteira';
import { Categoria } from './../model/categoria';

@Component({
  selector: 'app-edita-receita',
  templateUrl: './edita-receita.page.html',
  styleUrls: ['./edita-receita.page.scss'],
})
export class EditaReceitaPage implements OnInit {

  date: string;
  editingReceita: Receita;
  novaReceita: Receita;
  carteiraList: Carteira[];
  categoriaList: Categoria[];
  emailUsuario: string;

  constructor(public modalController: ModalController, private dbService: DBService, private afAuth: AngularFireAuth) {

    this.emailUsuario = this.afAuth.auth.currentUser.email;
    this.loadCarteiraList();
    this.loadCategoriaList();
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

    await this.loadCarteiraList();
    await this.loadCategoriaList();
    if (this.editingReceita) {
      this.novaReceita = this.editingReceita;
    }
    this.date = new Date(this.novaReceita.data).toISOString();
  }

  private async loadCarteiraList() {
    this.carteiraList = await this.dbService.search<Carteira>('/carteira', 'usuarioEmail', this.emailUsuario);
  }

  private async loadCategoriaList(){
    this.categoriaList = await this.dbService.search<Categoria>('/categoria', 'tipo', 'Receita');
  }

  editar() {
    
    const updatingObject = { nome: this.novaReceita.nome, categoria: this.novaReceita.categoria, valor: this.novaReceita.valor, data: this.novaReceita.data, carteiraUID: this.novaReceita.carteiraUID };
    this.dbService.update('/receita', this.novaReceita.uid, updatingObject)
      .then(() => {
        this.modalController.dismiss(this.novaReceita);
      }).catch(error => {
        console.log(error);
      });
  }

  voltar() {
    this.modalController.dismiss();
  }

}
