import { MenuController, NavController, ToastController, LoadingController } from '@ionic/angular';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from './../model/usuario';
import { AuthService } from './../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {

  slideOpts = {
    effect: 'slide',
    speed: 600,
    loop: true,
    zoom: false,
    autoplay: {
      delay: 4000,
    },
  };

  private loading: any;

  public usuarioLogin: Usuario = {};

  constructor(
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public router: Router,
    private menuCtrl: MenuController,
    public loadingController: LoadingController,
    public authService: AuthService, ) {
    this.usuarioLogin = new Usuario();
  }

  async loginFacebook() {
    await this.presentLoading();
    try {
      await this.authService.signInWithFacebook();
    } catch (error) {
      console.log(error);
      let message: string;
      switch (error.code) {
        case 'auth/popup-closed-by-user':
          message = 'Operação cancelada pelo usuário.'
          break;

      }
      this.presentToast(message);

    } finally {
      this.loading.dismiss();
    }
  }
  async loginGoogle() {
    await this.presentLoading();

    try {
      await this.authService.signInWithGoogle();
    } catch (error) {
      console.log(error);
      let message: string;
      switch (error.code) {
        case 'auth/popup-closed-by-user':
          message = 'Operação cancelada pelo usuário.'
          break;

      }
      this.presentToast(message);

    } finally {
      this.loading.dismiss();
    }
  }

  async loginEmail() {
    await this.presentLoading();

    try {
      await this.authService.login(this.usuarioLogin);
    } catch (error) {
      console.log(error);
      let message: string;
      switch (error.code) {
        case 'auth/argument-error':
          message = 'Digite um e-mail e senha'
          break;
        case 'auth/invalid-email':
          message = 'E-mail inválido.';
          break;
        case 'auth/wrong-password':
          message = 'Senha inválida.'
      }
      this.presentToast(message);

    } finally {
      this.loading.dismiss();
    }
  }
  async senha() {

    this.router.navigate(['/recupera-senha']);

  }
  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Carregando',
      translucent: false,
      spinner: "dots",
      mode: "ios",
    });
    return this.loading.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }

  irCadastro() {
    this.router.navigate(['/cadastro']);
  }

  ngOnInit() {
    this.menuCtrl.enable(false);
  }

  ngOnDestroy() {
    this.menuCtrl.enable(true);
  }
}
