import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Receita } from '../model/receita';
import { Carteira } from './../model/carteira';
import { DBService } from './../services/db.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Categoria } from '../model/categoria';

@Component({
  selector: 'app-cadastro-receita',
  templateUrl: './cadastro-receita.page.html',
  styleUrls: ['./cadastro-receita.page.scss'],
})
export class CadastroReceitaPage {

  date: string;
  novaReceita: Receita;
  carteiraList: Carteira[];
  categoriaList: Categoria[];
  emailUsuario: string;

  constructor(public modalController: ModalController, private dbService: DBService, private afAuth: AngularFireAuth) {
    this.novaReceita = new Receita();
    this.novaReceita.tipo = "receita";
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
    this.categoriaList = await this.dbService.search<Categoria>('/categoria', 'tipo', 'Receita');
  }

  voltar() {
    this.modalController.dismiss();
  }

  salvar() {
    this.novaReceita.data = new Date(this.date).getTime();
    this.dbService.insertInList<Receita>('/receita', this.novaReceita)
      .then(() => {
        this.modalController.dismiss(this.novaReceita);
      }).catch(error => {
        console.log(error);
      });
  }
}
