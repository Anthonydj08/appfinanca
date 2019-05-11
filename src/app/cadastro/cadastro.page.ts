import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { ToastController, LoadingController } from '@ionic/angular';
import { AngularFireDatabase } from '@angular/fire/database';

import * as firebase from 'firebase/app';
import { DBService } from './../services/db.service';
import { Usuario } from '../model/usuario';
import { AuthService } from './../services/auth.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage {


  private loading: any;
  public usuarioCadastro: Usuario = {};

  constructor(private router: Router,
    private afAuth: AngularFireAuth,
    public toastController: ToastController,
    public afDatabase: AngularFireDatabase,
    public dbService: DBService,
    public loadingController: LoadingController,
    public authService: AuthService,
  ) {
    this.usuarioCadastro = new Usuario();
  }

  
  async register() {
    await this.presentLoading();

    try {
      await this.authService.register(this.usuarioCadastro);
      this.usuarioCadastro.email = this.afAuth.auth.currentUser.email;
      this.usuarioCadastro.senha = null;
      this.usuarioCadastro.uid = this.afAuth.auth.currentUser.uid;
      this.dbService.insertInList<Usuario>('/usuario', this.usuarioCadastro)
    } catch (error) {
      let message: string;
      switch (error.code) {
        case 'auth/email-already-in-use':
          message = 'E-mail em uso.'
          break;

        case 'auth/invalid-email':
          message = 'E-mail inválido.'
          break;
      }
      this.presentToast(message);

    } finally {
      this.loading.dismiss();
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
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

  backToLogin() {
    this.router.navigate(['/login']);
  }

}
