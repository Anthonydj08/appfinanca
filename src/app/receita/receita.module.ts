import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ReceitaPage } from './receita.page';
import { CadastroReceitaPage } from '../cadastro-receita/cadastro-receita.page';

import { NgPipesModule, MaxPipe } from 'ngx-pipes';
import { TelaReceitaPage } from '../tela-receita/tela-receita.page';
import { EditaReceitaPage } from '../edita-receita/edita-receita.page';
const routes: Routes = [
  {
    path: '',
    component: ReceitaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    NgPipesModule
  ],
  declarations: [ReceitaPage, CadastroReceitaPage, TelaReceitaPage, EditaReceitaPage],
  providers: [
    MaxPipe
  ],
  entryComponents: [CadastroReceitaPage, TelaReceitaPage, EditaReceitaPage]
})
export class ReceitaPageModule { }
