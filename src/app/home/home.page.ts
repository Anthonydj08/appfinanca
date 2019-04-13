import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Receita } from '../model/receita';
import { Despesa } from '../model/despesa';
import { DBService } from '../services/db.service';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})

export class HomePage {
  despesas: Despesa[];
  receitas: Receita[];
  loading: boolean;
  totalReceita: number = 0;
  totalDespesa: number = 0;
  saldo: number = 0;

  loadingLista: boolean;

  data = new Date().getDate();
  constructor(public router: Router, private dbService: DBService, private fAuth: AngularFireAuth) {
    this.init();
  }
  private async init() {

    // const user = firebase.auth().currentUser;
    //   if(!user){
    //     this.router.navigate(['/login']);
    //   } else{
        
    //   }

    this.loading = true;

    this.dbService.listAndWatch('/despesa')
      .subscribe(data => this.initData());

    this.dbService.listAndWatch('/receita')
      .subscribe(data => this.initData());

  }

  private async initData() {
    if (!this.loadingLista) {
      this.loadingLista = true;
      await this.loadDespesas();
      await this.loadReceitas();
      await this.totalDespesas();
      await this.totalReceitas();
      await this.totalSaldo();
      this.loadingLista = false;
    }
  }

  private async loadDespesas() {
    await this.dbService.listWithUIDs<Despesa>('/despesa')
      .then(despesas => {
        this.despesas = despesas;
        this.loading = false;
      }).catch(error => {
        console.log(error);
      });
  }
  private async loadReceitas() {
    await this.dbService.listWithUIDs<Receita>('/receita')
      .then(receitas => {
        this.receitas = receitas;
        this.loading = false;
      }).catch(error => {
        console.log(error);
      });
  }

  private totalDespesas() {
    this.totalDespesa = 0;
    for (let index = 0; index < this.despesas.length; index++) {
      this.totalDespesa = this.totalDespesa + this.despesas[index].valor;
    }
    return this.totalDespesa;
  }
  private totalReceitas() {
    this.totalReceita = 0;
    for (let index = 0; index < this.receitas.length; index++) {
      this.totalReceita = this.totalReceita + this.receitas[index].valor;
    }
    return this.totalReceita;
  }

  private totalSaldo() {
    this.saldo = this.totalReceita - this.totalDespesa;
  }

  private despesasMes() {
    this.despesas = this.despesas.filter(despesa =>{
      
    })
    for (let index = 0; index < this.despesas.length; index++) {

    }
    return this.totalReceita;
  }


  openReceita() {
    this.router.navigate(['/tabs/receita']);
  }
  openDespesa() {
    this.router.navigate(['/tabs/despesa']);
  }
}
