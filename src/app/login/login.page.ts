import { MenuController, NavController, ToastController, LoadingController } from '@ionic/angular';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { Usuario } from './../model/usuario';
import { DBService } from './../services/db.service';

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
  email: string;
  senha: string;
  usuarioList: Usuario[];
  novoUsuario: Usuario;
  private loading: any;

  constructor(
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    private fAuth: AngularFireAuth,
    public router: Router,
    private menuCtrl: MenuController,
    private dbService: DBService,
    public loadingController: LoadingController ) {
      this.novoUsuario = new Usuario();
  }
  private async loadUsuarioList() {
    this.usuarioList = await this.dbService.listWithUIDs<Usuario>('/usuario');
  }
  loginGoogle() {
    this.presentLoading();
    this.loadUsuarioList();
    this.fAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(result => {
        for (let index = 0; index < this.usuarioList.length; index++) {
          const element = this.usuarioList[index];
          if (element.uid = result.user.uid) {
            this.navCtrl.navigateRoot('/home');
          } else {
            this.novoUsuario.uid = result.user.uid;
            this.novoUsuario.nome = "teste";
            this.dbService.insertInList<Usuario>('/usuario', this.novoUsuario)
              .then(() => {
                firebase.auth.Auth.Persistence.LOCAL
                this.navCtrl.navigateRoot('/home');
              }).catch(error => {
                console.log(error);
              });
          }
        }
      });
  }

  loginEmail() {
    this.presentLoading();
    this.fAuth.auth.signInWithEmailAndPassword(this.email, this.senha)
      .then(result => {
        this.navCtrl.navigateRoot('/home');

      }).catch(error => {
        this.presentToast('E-mail e/ou senha inválido(s).');
        delete this.senha;
      });
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
