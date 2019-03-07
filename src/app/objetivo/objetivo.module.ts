import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ObjetivoPage } from './objetivo.page';
import { CadastroObjetivoPage } from './../cadastro-objetivo/cadastro-objetivo.page';
const routes: Routes = [
  {
    path: '',
    component: ObjetivoPage
  }
];

@NgModule({
  imports: [
  
  CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ObjetivoPage, CadastroObjetivoPage],
  entryComponents: [CadastroObjetivoPage]
})
export class ObjetivoPageModule {}
