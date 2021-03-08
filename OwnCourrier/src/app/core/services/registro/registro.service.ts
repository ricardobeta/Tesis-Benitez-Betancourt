import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import 'firebase/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { BehaviorSubject } from 'rxjs';
import { RegistroNegocio } from '../../models/registro.model';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {
  public verificado = new BehaviorSubject<boolean>(false);
  public negocio = new BehaviorSubject<RegistroNegocio>(undefined);
  
  constructor(public auth: AngularFireAuth,
    private db: AngularFireDatabase) { }

  recaptcha() {
    return new firebase.auth.RecaptchaVerifier('recaptcha-container', {
      size: 'normal', callback: (res) => {
        this.verificado.next(true);
      }, 'expired-callback': () => { this.verificado.next(false); }
    });
  }

  verificacionSMS(captchaKey, celular) {
    const celularCode = '+593'+celular; 
    return this.auth.signInWithPhoneNumber(celularCode, captchaKey);
  }

  registroAdmin(correo, password) {
    return this.auth.createUserWithEmailAndPassword(correo, password);
  }

  registrarNegocio(negocio: RegistroNegocio) {
    return this.db.list('Negocios').push(negocio);
  }
}
