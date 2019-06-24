import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { CadastroPage } from '../cadastro/cadastro.page';
import { TelaMapaPage } from '../tela-mapa/tela-mapa.page';


const routes: Routes = [
  {
    path: '',
    component: CadastroPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CadastroPage, TelaMapaPage],
  entryComponents: [TelaMapaPage]
})
export class CadastroPageModule {}