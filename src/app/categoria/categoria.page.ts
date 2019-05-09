import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController, AlertController } from '@ionic/angular';
import { DBService } from '../services/db.service';
import { Icone } from '../model/icone';
import { Categoria } from './../model/categoria';
import { IconePage } from '../icone/icone.page';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.page.html',
  styleUrls: ['./categoria.page.scss'],
})
export class CategoriaPage implements OnInit {

  novoIcone: Icone;
  iconeList: Icone[];
  categoriaList: Categoria[];
  novaCategoria: Categoria;
  icone = null;

  constructor(public modalController: ModalController,
    private dbService: DBService,
    private activatedRoute: ActivatedRoute,
    private toast: ToastController,
    public alertController: AlertController) {
      
    this.novoIcone = new Icone();
    this.novaCategoria = new Categoria();
    this.loadIconeList();
    this.loadCategoriaList();
  }

  ngOnInit() {
    this.icone = this.activatedRoute.snapshot.paramMap.get('nome');
  }

  customPopoverCategoria: any = {
    header: 'Tipo',
    mode: 'ios',
  };

  private async loadIconeList() {
    this.iconeList = await this.dbService.list<Icone>('/icone');
  }
  private async loadCategoriaList() {
    this.categoriaList = await this.dbService.search<Categoria>('/categoria', 'tipo', 'Despesa');
  }

  private async segmentChanged(ev: any) {
    if(ev.detail.value == "Receitas"){
      this.categoriaList = await this.dbService.search<Categoria>('/categoria', 'tipo', 'Receita');
    }
    else{
      this.categoriaList = await this.dbService.search<Categoria>('/categoria', 'tipo', 'Despesa');
    }
  }

  async presentToast(message: string) {
    const toast = await this.toast.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  salvar() {
    this.novaCategoria.icone = this.icone;
    this.dbService.insertInList<Categoria>('/categoria', this.novaCategoria)
      .then(() => {
        this.presentToast('Categoria cadastrada');
      }).catch(error => {
        console.log(error);
      });
      this.loadCategoriaList();
      this.novaCategoria = new Categoria();
      this.icone = null;
  }

  salvarIcone() {
    this.dbService.insertInList<Icone>('/icone', this.novoIcone)
      .then(() => {
        this.presentToast('Icone cadastrada');
      }).catch(error => {
        console.log(error);
      });
  }

  async abrirIcones(Categoria: Categoria) {
    const modal = await this.modalController.create({
      component: IconePage,
      componentProps: {
        nomeIcone: this.icone
      }
    });

    return await modal.present();
  }
}
