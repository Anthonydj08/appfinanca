import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  { path: '', loadChildren: './login/login.module#LoginPageModule',canActivate: [LoginGuard] },
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule', canActivate: [AuthGuard] },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule', canActivate: [LoginGuard] },
  { path: 'home', redirectTo: '/tabs/home', canActivate: [AuthGuard] },
  { path: 'receita', loadChildren: './receita/receita.module#ReceitaPageModule', canActivate: [AuthGuard] },
  { path: 'despesa', loadChildren: './despesa/despesa.module#DespesaPageModule', canActivate: [AuthGuard] },
  { path: 'cadastro', loadChildren: './cadastro/cadastro.module#CadastroPageModule', canActivate: [LoginGuard] },
  { path: 'objetivo', loadChildren: './objetivo/objetivo.module#ObjetivoPageModule', canActivate: [AuthGuard] },
  { path: 'carteira', loadChildren: './carteira/carteira.module#CarteiraPageModule', canActivate: [AuthGuard] },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],


  exports: [RouterModule],
})
export class AppRoutingModule { }
