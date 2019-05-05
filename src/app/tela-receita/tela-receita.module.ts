import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TelaReceitaPage } from './tela-receita.page';

import { CadastroReceitaPage } from '../cadastro-receita/cadastro-receita.page';
import { EditaReceitaPage } from '../edita-receita/edita-receita.page';
const routes: Routes = [
  {
    path: '',
    component: TelaReceitaPage
  }
];

@NgModule({
  imports: [
  CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TelaReceitaPage, EditaReceitaPage],

  entryComponents: [EditaReceitaPage]
})
export class TelaReceitaPageModule {}
