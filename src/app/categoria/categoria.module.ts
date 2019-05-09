import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CategoriaPage } from './categoria.page';
import { IconePage } from '../icone/icone.page';

const routes: Routes = [
  {
    path: '',
    component: CategoriaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CategoriaPage, IconePage],
  entryComponents: [IconePage]
})
export class CategoriaPageModule {}
