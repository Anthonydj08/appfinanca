import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RecuperaSenhaPage } from './recupera-senha.page';

const routes: Routes = [
  {
    path: '',
    component: RecuperaSenhaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RecuperaSenhaPage]
})
export class RecuperaSenhaPageModule {}
