import { MenuController, NavController, ToastController } from '@ionic/angular';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';

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
    watchSlidesProgress:true,
    autoplay: {
      delay: 7000,
    },
  };
  email: string;
  senha: string;
  
  constructor(
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    private fAuth: AngularFireAuth,
    public router: Router,
    private menuCtrl: MenuController) {

  }

  loginGoogle() {
    this.fAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(result => {
        this.router.navigateByUrl('/tabs/home');
      });
  }

  loginEmail() {
    this.fAuth.auth.signInWithEmailAndPassword(this.email, this.senha)
      .then(result => {
        this.router.navigate(['/tabs']);
        this.navCtrl.navigateRoot('/receita');

      }).catch(error => {
        this.presentToast('E-mail e/ou senha inválido(s).');
        delete this.senha;
      });
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }

  logout() {
    this.fAuth.auth.signOut();
  };

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
