import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Usuario } from './../model/usuario';
import * as firebase from 'firebase/app';

import AuthProvider = firebase.auth.AuthProvider;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: firebase.User;

  constructor(private afa: AngularFireAuth) {

    afa.authState.subscribe(user => {
      this.user = user;
    });
  }

  login(usuario: Usuario) {
    return this.afa.auth.signInWithEmailAndPassword(usuario.email, usuario.senha);
  }
  loginGoogle() {
    //return this.afa.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    return this.oauthSignIn(new firebase.auth.GoogleAuthProvider());
    // firebase.auth().signInWithRedirect(new firebase.auth.GoogleAuthProvider()).then(function() {
    //    return firebase.auth().getRedirectResult();
    // });
  }
  register(usuario: Usuario) {
    return this.afa.auth.createUserWithEmailAndPassword(usuario.email, usuario.senha);
  }

  senha(usuario: Usuario) {
    return this.afa.auth.sendPasswordResetEmail(usuario.email);
  }
  logout() {
    return this.afa.auth.signOut();
  }

  getAuth() {
    return this.afa.auth;
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
