import { Component } from '@angular/core';
import { ModalController, ToastController, AlertController } from '@ionic/angular';
import { DBService } from '../services/db.service';
import { Usuario } from '../model/usuario';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-recupera-senha',
  templateUrl: './recupera-senha.page.html',
  styleUrls: ['./recupera-senha.page.scss'],
})
export class RecuperaSenhaPage {

  email: string;
  usuarioList: Usuario[];
  usuario: Usuario;

  constructor(public modalController: ModalController,
    private dbService: DBService,
    public toast: ToastController,
    public alertController: AlertController,
    public router: Router,
    public authService: AuthService,
    public toastCtrl: ToastController, ) {

  }


  private async alteraSenha() {
    this.usuarioList = await this.dbService.search<Usuario>('/usuario', 'email', this.email);
    this.usuario = this.usuarioList[0];

    if (this.usuario) {
      this.authService.senha(this.usuario);
      this.presentToast('Um E-mail foi enviado para ' + this.usuario.email);
      this.router.navigate(['/login']);
    } else {
      this.presentToast('E-mail não enviado. Usuário não cadastrado');
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }

  voltar() {
    this.router.navigate(['/login']);
    console.log(this.usuarioList);
  }
}
