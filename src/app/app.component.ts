import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { LocalNotifications, ELocalNotificationTriggerUnit } from '@ionic-native/local-notifications/ngx';
import * as shuffleArray from 'shuffle-array';
import * as firebase from 'firebase/app';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { Usuario } from './model/usuario';
import { DBService } from './services/db.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {
  pages = [
    {
      title: 'Home',
      url: '/tabs/home',
      icon: 'home'
    },
    {
      title: 'Receitas',
      url: '/tabs/receita',
      icon: 'trending-up'
    },
    {
      title: 'Despesas',
      url: '/tabs/despesa',
      icon: 'trending-down'
    },
    {
      title: 'Objetivos',
      url: '/objetivo',
      icon: 'checkbox-outline'
    },
    {
      title: 'Carteira',
      url: '/carteira',
      icon: 'wallet'
    },
    {
      title: 'Categorias',
      url: '/categoria',
      icon: 'clipboard'
    }
  ];

  usuarios: Usuario[];
  usuario: Usuario;
  userEmail: string;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private localNotifications: LocalNotifications,
    private afAuth: AngularFireAuth,
    private screenOrientation: ScreenOrientation,
    private dbService: DBService
  ) {
    this.initializeApp();
    this.init();
  }

  private async init() {
    await this.loadUsuarios();
  }

  private async loadUsuarios() {
    this.afAuth.user.subscribe(async user => {
      if (user) {
        this.userEmail = user.email;
        this.usuarios = await this.dbService.search<Usuario>('/usuario', 'email', this.userEmail);
        await this.loadUsuario();
      }
    });
  }
  private async loadUsuario() {
    this.usuarios = await this.dbService.search<Usuario>('/usuario', 'email', this.userEmail);
    this.usuario = this.usuarios[0];
  }

  logout() {
    firebase.auth().signOut();
    this.router.navigate(['/login']);
  };

  ngOnInit() {
    this.router.events.subscribe((event: RouterEvent) => {
      if (event instanceof NavigationEnd) {
        this.pages.map(p => {
          return p['active'] = (event.url === p.url);
        });
      }
    });

  }

  mensagensNotificação = [
    'Já registrou seus gastos hoje?',
    'Não se esqueca de registrar suas despesas hoje!',
    'Confira como anda sua situação financeira.',
  ];
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);

      shuffleArray(this.mensagensNotificação).forEach((message, index) => {
        this.localNotifications.schedule({
          id: index,
          text: message,
          trigger: {
            in: 1 + (index * 2),
            unit: ELocalNotificationTriggerUnit.DAY,
          }
        })
      })
    });
  }

}
