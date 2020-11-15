import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Usuario } from './../model/usuario';
import * as firebase from 'firebase/app';

import { GooglePlus } from '@ionic-native/google-plus/ngx';

import AuthProvider = firebase.auth.AuthProvider;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: firebase.User;
  winobj: any = null;
  constructor(private afa: AngularFireAuth, private googlePlus: GooglePlus) {
    this.winobj = window;
    afa.authState.subscribe(user => {
      this.user = user;
    });
  }

  login(usuario: Usuario) {
    return this.afa.auth.signInWithEmailAndPassword(usuario.email, usuario.senha);
  }

  register(usuario: Usuario) {
    return this.afa.auth.createUserWithEmailAndPassword(usuario.email, usuario.senha);
  }

  senha(usuario: Usuario) {
    return this.afa.auth.sendPasswordResetEmail(usuario.email);
  }

  is_local() {
    if (/^file:\/{3}[^\/]/i.test(this.winobj.location.href)) {
      return true;
    }
    return false;
  }
  
  logout() {

    if (!this.is_local()) {
      return this.afa.auth.signOut();
    } else {
      this.googlePlus.disconnect().then(
        (msg) => {
          alert('logout ok');
          if (firebase.auth().currentUser) {
            firebase.auth().signOut();
          }
        }).catch(
          (msg) => {
            alert('logout error: ' + msg);
          })
        ;
    }
  }

  getAuth() {
    return this.afa.auth;
  }

  signInWithFacebook() {
    console.log('Sign in with google');
    return this.oauthSignIn(new firebase.auth.FacebookAuthProvider());
  }

  signInWithGoogle() {
    return this.googlePlus.login({}).then(res => {
      const user_data_google = res;
      console.log(user_data_google);
      return this.afa.auth.signInWithCredential(firebase.auth.GoogleAuthProvider.credential(null, user_data_google.accessToken))
    })
    /*console.log('Sign in with google');
    return this.oauthSignIn(new firebase.auth.GoogleAuthProvider());*/
  }

  private oauthSignIn(provider: AuthProvider) {
    if (!(<any>window).cordova) {
      return this.afa.auth.signInWithPopup(provider);
    } else {
      return this.afa.auth.signInWithRedirect(provider)
        .then(() => {
          return this.afa.auth.getRedirectResult().then(result => {
            // This gives you a Google Access Token.
            // You can use it to access the Google API.
            let token = result.credential.providerId;
            // The signed-in user info.
            let user = result.user;
            console.log(token, user);
          }).catch(function (error) {
            // Handle Errors here.
            alert(error.message);
          });
        });
    }
  }

}
