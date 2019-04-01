import { Component, OnInit } from '@angular/core';
import { DBService } from './../services/db.service';
import { Carteira } from '../model/carteira';

@Component({
  selector: 'app-carteira',
  templateUrl: './carteira.page.html',
  styleUrls: ['./carteira.page.scss'],
})
export class CarteiraPage{

  novaCarteira: Carteira;

  carteiras: Carteira[];
  loading: boolean;

  constructor( private dbService: DBService) {
    this.novaCarteira = new Carteira();
    this.init();
  }

  private async init() {
    this.loading = true;

    await this.loadCarteiras();
  }
  private async loadCarteiras() {
    this.dbService.listWithUIDs<Carteira>('/carteira')
      .then(carteiras => {
        this.carteiras = carteiras;
        this.loading = false;
      }).catch(error => {
        console.log(error);
      });
  }

  private insert() {
    this.dbService.insertInList<Carteira>('/carteira', this.novaCarteira)
      .then(() => {
        this.novaCarteira;
      }).catch(error => {
        console.log(error);
      });
  }
}
