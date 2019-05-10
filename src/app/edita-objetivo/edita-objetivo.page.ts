import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DBService } from '../services/db.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Objetivo } from './../model/objetivo';

@Component({
  selector: 'app-edita-objetivo',
  templateUrl: './edita-objetivo.page.html',
  styleUrls: ['./edita-objetivo.page.scss'],
})
export class EditaObjetivoPage implements OnInit {

  date: string;
  editingObjetivo: Objetivo;
  novoObjetivo: Objetivo;

  constructor(public modalController: ModalController, private dbService: DBService, private afAuth: AngularFireAuth,) {
    
   }

  ngOnInit() {
    if (this.editingObjetivo) {
      this.novoObjetivo = this.editingObjetivo;
    }
    this.date = new Date(this.novoObjetivo.data).toISOString();
  }

  editar() {
    const updatingObject = { nome: this.novoObjetivo.nome, categoria: this.novoObjetivo.categoria, valor: this.novoObjetivo.valor, data: this.novoObjetivo.data, };
    this.dbService.update('/objetivo', this.novoObjetivo.uid, updatingObject)
      .then(() => {
        this.modalController.dismiss(this.novoObjetivo);
      }).catch(error => {
        console.log(error);
      });
  }

  voltar() {
    this.modalController.dismiss();
  }
}
