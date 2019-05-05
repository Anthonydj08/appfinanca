import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EditaReceitaPage } from './edita-receita.page';
import { TelaReceitaPage } from '../tela-receita/tela-receita.page';

const routes: Routes = [
  {
    path: '',
    component: EditaReceitaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EditaReceitaPage, TelaReceitaPage],
  entryComponents: [TelaReceitaPage]
})
export class EditaReceitaPageModule {}
