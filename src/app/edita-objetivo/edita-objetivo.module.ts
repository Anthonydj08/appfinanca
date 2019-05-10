import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EditaObjetivoPage } from './edita-objetivo.page';
import { TelaObjetivoPage } from '../tela-objetivo/tela-objetivo.page';

const routes: Routes = [
  {
    path: '',
    component: EditaObjetivoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EditaObjetivoPage, TelaObjetivoPage],
  entryComponents: [TelaObjetivoPage]
})
export class EditaObjetivoPageModule {}
