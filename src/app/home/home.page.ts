import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { Receita } from '../model/receita';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { Despesa } from '../model/despesa';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})

export class HomePage {
  //username:string;
  receitaDB: AngularFireList<Receita>;
  receita: Observable<Receita[]>;
  despesaDB: AngularFireList<Despesa>;
  despesa: Observable<Despesa[]>;
  
  constructor(public router: Router, public db: AngularFireDatabase, ) {
    /*this.username = firebase.auth().currentUser.displayName.split(' ').slice(0, 1).join(' ');
    if(firebase.auth().currentUser){
    }*/
    this.receitaDB = db.list<Receita>('receita');
    this.receita = this.receitaDB.valueChanges();
    this.despesaDB = db.list<Despesa>('despesa');
    this.despesa = this.despesaDB.valueChanges();
  }

  openReceita() {
    //this.receita.presentModal();
    this.router.navigate(['/tabs/receita']);
  }
  openDespesa() {
    this.router.navigate(['/tabs/despesa']);
  }

}
