import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { ToastController } from '@ionic/angular';
import { AngularFireDatabase } from '@angular/fire/database';
import { Profile } from 'selenium-webdriver/firefox';

import * as firebase from 'firebase/app';
import { DBService } from './../services/db.service';
import { Usuario } from '../model/usuario';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {
  email: string;
  password: string;
  novoUsuario: Usuario;

  constructor(private router: Router, private afAuth: AngularFireAuth, public toastController: ToastController, public afDatabase: AngularFireDatabase, public dbService: DBService) { 
    this.novoUsuario = new Usuario();
  }

  ngOnInit() {
  }

  register() {
    this.afAuth.auth.createUserWithEmailAndPassword(this.email, this.password)
      .then(result => {
        this.novoUsuario.uid = result.user.uid;
        this.dbService.insertInList<Usuario>('/usuario', this.novoUsuario)
          .then(() => {
            this.presentToast('Usuário criado com sucesso');
            this.backToLogin();
          }).catch(error => {
            console.log(error);
          });
      })
      .catch(error => {
        this.presentToast('Erro ao cadastrar usuário');
        console.log(error);
      });
  }

  profile = {} as Profile;

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  backToLogin() {
    this.router.navigate(['/login']);
  }

}
