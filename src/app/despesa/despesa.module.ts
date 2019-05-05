import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DespesaPage } from './despesa.page';
import { CadastroDespesaPage } from './../cadastro-despesa/cadastro-despesa.page';

import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

import { NgPipesModule, MaxPipe } from 'ngx-pipes';
import { TelaDespesaPage } from '../tela-despesa/tela-despesa.page';
import { EditaDespesaPage } from '../edita-despesa/edita-despesa.page';
const routes: Routes = [
  {
    path: '',
    component: DespesaPage
  }
];

@NgModule({
  imports: [

    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    MatInputModule,
    MatSelectModule,
    NgPipesModule
  ],
  declarations: [DespesaPage, CadastroDespesaPage, TelaDespesaPage, EditaDespesaPage],
  providers: [
    MaxPipe
  ],
  entryComponents: [CadastroDespesaPage, TelaDespesaPage, EditaDespesaPage]
})
export class DespesaPageModule { }
