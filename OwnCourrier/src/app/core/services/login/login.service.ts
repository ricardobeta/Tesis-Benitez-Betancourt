import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';
import { RegistroNegocio } from '../../models/registro.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public negocio = new BehaviorSubject<RegistroNegocio>(undefined);
  constructor(public auth: AngularFireAuth) { }


  iniciarSesion() {
    if(!this.negocio) {

    }
  }

  iniciarSesionAdm(correo, password) {
    this.auth.signInWithEmailAndPassword(correo, password);
  }

  iniciarSesionConductor(correo, password) {
    this.auth.signInWithEmailAndPassword(correo, password);
  }

  logout() {

  }
}
