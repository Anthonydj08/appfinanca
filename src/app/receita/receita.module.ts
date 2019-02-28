import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ReceitaPage } from './receita.page';
import { CadastroReceitaPage } from '../cadastro-receita/cadastro-receita.page';

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
    RouterModule.forChild(routes)
  ],
  declarations: [ReceitaPage, CadastroReceitaPage],
  entryComponents: [CadastroReceitaPage]
})
export class ReceitaPageModule {}
