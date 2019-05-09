import { Component, OnInit, ViewChild } from '@angular/core';
import chartJs from 'chart.js';
import { Despesa } from '../model/despesa';
import { Carteira } from '../model/carteira';
import { DBService } from '../services/db.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Firebase } from '@ionic-native/firebase/ngx';
import { Receita } from '../model/receita';
@Component({
  selector: 'app-graficos',
  templateUrl: './graficos.page.html',
  styleUrls: ['./graficos.page.scss'],
})
export class GraficosPage {

  @ViewChild('doughnutCanvas') doughnutCanvas;
  @ViewChild('barCanvas') barCanvas;

  doughnutChart: any;
  barChart: any;

  loading: boolean;
  despesas: Despesa[];
  receitas: Receita[];

  carteiraList: Carteira[];
  loadingLista: boolean;
  emailUsuario: String;

  totalDespesa: number = 0;
  totalReceita: number = 0;


  constructor(private dbService: DBService, private fAuth: AngularFireAuth, private firebase: Firebase) {
    this.firebase.setScreenName("Graficos");
    this.init();
  }
  private async init() {

    this.dbService.listAndWatch('/despesa')
      .subscribe(data => this.initData());

    this.dbService.listAndWatch('/receita')
      .subscribe(data => this.initData());

  }

  private async initData() {
    if (!this.loadingLista) {
      this.loadingLista = true;
      this.emailUsuario = this.fAuth.auth.currentUser.email;
      
      await this.loadCarteiraList();
      await this.loadDespesas();
      await this.loadReceitas();
      await this.totalDespesas();
      await this.totalReceitas();
      this.loadingLista = false;
    }
  }

  private async loadCarteiraList() {
    this.carteiraList = await this.dbService.search<Carteira>('/carteira', 'usuarioEmail', this.emailUsuario);
  }


  private async loadReceitas() {
    await this.dbService.listWithUIDs<Receita>('/receita')
      .then(receitas => {
        this.receitas = receitas.filter(d => this.carteiraList.some(c => c.uid === d.carteiraUID));
        this.loading = false;
      }).catch(error => {
        console.log(error);
      });
  }

  private async loadDespesas() {
    await this.dbService.listWithUIDs<Despesa>('/despesa')
      .then(despesas => {
        this.despesas = despesas.filter(d => this.carteiraList.some(c => c.uid === d.carteiraUID));
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

  ngAfterViewInit() {
    setTimeout(() => {
      this.doughnutChart = this.getDoughnutChart();
      this.barChart = this.getBarChart();
    }, 2150);

  }

  getChart(context, chartType, data, options?) {
    return new chartJs(context, {
      data,
      options,
      type: chartType
    })
  }

  getBarChart() {

    const data = {
      labels: ["Janeiro", "Fevereiro", "Março", "Abril"],
      datasets: [
        {
          label: "Receitas",
          backgroundColor: "#4ddf86",
          data: [133, 221, 783, 2478]
        }, {
          label: "Despesas",
          backgroundColor: "#f04141",
          data: [408, 547, 675, 734]
        }
      ]
    };
    const options = {
      title: {
        display: true,
        text: 'Population growth (millions)'
      }
    }
    return this.getChart(this.barCanvas.nativeElement, 'bar', data, options);
  }

  getDoughnutChart() {
    const data = {
      labels: ['Receitas R$' + this.totalReceita, 'Despesas R$' + this.totalDespesa],
      datasets: [{
        data: [this.totalReceita, this.totalDespesa],
        backgroundColor: ['#4ddf86', '#f04141']
      }],
    };
    const options = {
      legend: {
        position: 'right',
      },
      layout: {
        padding: {
          left: 0,
          right: 0,
          top: 0,
          bottom: 0
        }
      }
    }

    return this.getChart(this.doughnutCanvas.nativeElement, 'doughnut', data, options);
  }
}
