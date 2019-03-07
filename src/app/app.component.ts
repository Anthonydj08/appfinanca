import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { LocalNotifications, ELocalNotificationTriggerUnit } from '@ionic-native/local-notifications/ngx';
import * as shuffleArray from 'shuffle-array';
import * as firebase from 'firebase/app';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {
  pages = [
    {
      title: 'Login',
      url: '/login',
      icon: 'log-in'
    },
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
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private localNotifications: LocalNotifications,
    private fAuth: AngularFireAuth,

  ) {
    this.initializeApp();
  }

  logout() {
    console.log(firebase.auth().currentUser.email);
    firebase.auth().signOut();

    console.log("teste");
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

      shuffleArray(this.mensagensNotificação).forEach((message, index) => {
        this.localNotifications.schedule({
          id: index,
          text: message,
          trigger: {
            in: index * 2,
            unit: ELocalNotificationTriggerUnit.SECOND,
          }
        })
      })
    });
  }

}
