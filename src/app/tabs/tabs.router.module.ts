import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: '',
        redirectTo: '/tabs/(home:home)',
        pathMatch: 'full',
      },
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: '../home/home.module#HomePageModule'
          }
        ]
      },
      {
        path: 'receita',
        children: [
          {
            path: '',
            loadChildren: '../receita/receita.module#ReceitaPageModule'
          }
        ]
      },
      {
        path: 'despesa',
        children: [
          {
            path: '',
            loadChildren: '../despesa/despesa.module#DespesaPageModule'
          }
        ]
      },
      {
        path: 'graficos',
        children: [
          {
            path: '',
            loadChildren: '../graficos/graficos.module#GraficosPageModule'
          }
        ]
      },
      
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
