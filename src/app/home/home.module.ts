import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { NgPipesModule, MaxPipe } from 'ngx-pipes';
import { HideHeaderDirective } from '../directives/hide-header.directive';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: HomePage }]),
    NgPipesModule,
  ],
  declarations: [HomePage, HideHeaderDirective],
  providers: [
    MaxPipe
  ],
})
export class HomePageModule { }
