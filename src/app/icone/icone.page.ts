import { Component, OnInit } from '@angular/core';
import { Icone } from '../model/icone';
import { ModalController, NavParams } from '@ionic/angular';
import { DBService } from '../services/db.service';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-icone',
  templateUrl: './icone.page.html',
  styleUrls: ['./icone.page.scss'],
})
export class IconePage implements OnInit {

  iconeList: Icone[];
  nomeIcone = null;

  constructor(public modalController: ModalController, private dbService: DBService, private afAuth: AngularFireAuth, public navParams: NavParams) {
    this.loadIconeList();
   }

  ngOnInit() {
    this.nomeIcone = this.navParams.get('nomeIcone')
    console.log(this.nomeIcone);
  }

  private async loadIconeList() {
    this.iconeList = await this.dbService.list<Icone>('/icone');
  }
  save(){
    this.modalController.dismiss();
  }
  voltar() {
    this.modalController.dismiss();
  }
}
