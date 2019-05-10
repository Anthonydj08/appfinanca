import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TelaObjetivoPage } from './tela-objetivo.page';
import { EditaObjetivoPage } from '../edita-objetivo/edita-objetivo.page';

const routes: Routes = [
  {
    path: '',
    component: TelaObjetivoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TelaObjetivoPage, EditaObjetivoPage],
  entryComponents: [EditaObjetivoPage]
})
export class TelaObjetivoPageModule {}
