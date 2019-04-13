import { MenuController, NavController, ToastController, LoadingController } from '@ionic/angular';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { Usuario } from './../model/usuario';
import { DBService } from './../services/db.service';
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


  async loginGoogle() {
    await this.presentLoading();

    try {
      await this.authService.loginGoogle();
    } catch (error) {
      console.log(error.message);
      this.presentToast(error.message);
    } finally {
      this.loading.dismiss();
    }
  }

  async loginEmail() {
    await this.presentLoading();

    try {
      await this.authService.login(this.usuarioLogin);
    } catch (error) {
      console.log(error.message);
      this.presentToast('E-mail e/ou senha inválido(s).');
    } finally {
      this.loading.dismiss();
    }
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
    this.router.navigateByUrl('/cadastro');
  }

  ngOnInit() {
    this.menuCtrl.enable(false);
  }

  ngOnDestroy() {
    this.menuCtrl.enable(true);
  }
}
