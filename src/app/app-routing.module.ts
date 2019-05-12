import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  { path: '', loadChildren: './login/login.module#LoginPageModule', canActivate: [LoginGuard] },
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule', canActivate: [AuthGuard] },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule', canActivate: [LoginGuard] },
  { path: 'home', redirectTo: '/tabs/home', canActivate: [AuthGuard] },
  { path: 'receita', loadChildren: './receita/receita.module#ReceitaPageModule', canActivate: [AuthGuard] },
  { path: 'despesa', loadChildren: './despesa/despesa.module#DespesaPageModule', canActivate: [AuthGuard] },
  { path: 'cadastro', loadChildren: './cadastro/cadastro.module#CadastroPageModule', canActivate: [LoginGuard] },
  { path: 'objetivo', loadChildren: './objetivo/objetivo.module#ObjetivoPageModule', canActivate: [AuthGuard] },
  { path: 'carteira', loadChildren: './carteira/carteira.module#CarteiraPageModule', canActivate: [AuthGuard] },
  { path: 'tela-receita', loadChildren: './tela-receita/tela-receita.module#TelaReceitaPageModule', canActivate: [AuthGuard] },
  { path: 'edita-receita', loadChildren: './edita-receita/edita-receita.module#EditaReceitaPageModule', canActivate: [AuthGuard] },
  { path: 'edita-despesa', loadChildren: './edita-despesa/edita-despesa.module#EditaDespesaPageModule', canActivate: [AuthGuard] },
  { path: 'tela-despesa', loadChildren: './tela-despesa/tela-despesa.module#TelaDespesaPageModule', canActivate: [AuthGuard] },
  { path: 'categoria', loadChildren: './categoria/categoria.module#CategoriaPageModule', canActivate: [AuthGuard] },
  { path: 'icone', loadChildren: './icone/icone.module#IconePageModule', canActivate: [AuthGuard] },
  { path: 'graficos', loadChildren: './graficos/graficos.module#GraficosPageModule', canActivate: [AuthGuard] },
  { path: 'tela-objetivo', loadChildren: './tela-objetivo/tela-objetivo.module#TelaObjetivoPageModule', canActivate: [AuthGuard] },
  { path: 'edita-objetivo', loadChildren: './edita-objetivo/edita-objetivo.module#EditaObjetivoPageModule', canActivate: [LoginGuard] },
  { path: 'recupera-senha', loadChildren: './recupera-senha/recupera-senha.module#RecuperaSenhaPageModule', canActivate: [LoginGuard] },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],


  exports: [RouterModule],
})
export class AppRoutingModule { }
