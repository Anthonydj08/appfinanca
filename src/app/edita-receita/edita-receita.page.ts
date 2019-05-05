import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DBService } from '../services/db.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Receita } from '../model/receita';
import { Carteira } from '../model/carteira';

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
  emailUsuario: string;

  constructor(public modalController: ModalController, private dbService: DBService, private afAuth: AngularFireAuth) {

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
    if (this.editingReceita) {
      this.novaReceita = this.editingReceita;
    }
  }

  private async loadCarteiraList() {
    this.carteiraList = await this.dbService.search<Carteira>('/carteira', 'usuarioEmail', this.emailUsuario);
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
