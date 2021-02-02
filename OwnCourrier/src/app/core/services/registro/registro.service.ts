import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import 'firebase/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {
  public verificado = new BehaviorSubject<boolean>(false);
  public keyEmpresa = new BehaviorSubject<string>('');
  constructor(public auth: AngularFireAuth,
    private db: AngularFireDatabase) { }

  recaptcha() {
    return new firebase.auth.RecaptchaVerifier('recaptcha-container', {
      size: 'normal', callback: (res) => {
        //console.log('hola');
        this.verificado.next(true);
      }, 'expired-callback': () => { this.verificado.next(false); }
    });
  }
}
