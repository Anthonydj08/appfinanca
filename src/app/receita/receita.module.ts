import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ReceitaPage } from './receita.page';
import { CadastroReceitaPage } from '../cadastro-receita/cadastro-receita.page';

import { NgPipesModule, MaxPipe } from 'ngx-pipes';
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
  declarations: [ReceitaPage, CadastroReceitaPage],
  providers: [
    MaxPipe
  ],
  entryComponents: [CadastroReceitaPage]
})
export class ReceitaPageModule {}
