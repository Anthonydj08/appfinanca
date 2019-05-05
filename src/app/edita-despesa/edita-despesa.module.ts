import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EditaDespesaPage } from './edita-despesa.page';
import { TelaDespesaPage } from '../tela-despesa/tela-despesa.page';

const routes: Routes = [
  {
    path: '',
    component: EditaDespesaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EditaDespesaPage, TelaDespesaPage],
  
  entryComponents: [TelaDespesaPage]
})
export class EditaDespesaPageModule {}
