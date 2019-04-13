import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { AuthService } from './../services/auth.service';
import { NavController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private authService: AuthService,public navCtrl: NavController, private router: Router) {

  }

  canActivate(): Promise<boolean> {
    return new Promise(resolve => {
      this.authService.getAuth().onAuthStateChanged(usuario => {
        if (usuario) this.navCtrl.navigateRoot(["/home"]);

        resolve(!usuario ? true : false);
      })
    })
  }
}
