import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { first, take } from 'rxjs/operators';
import { RegistroNegocio } from '../../models/registro.model';
import { NegocioService } from '../negocio/negocio.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(public auth: AngularFireAuth,
              private db: AngularFireDatabase,
              private router: Router,
              private negocioService: NegocioService,
              private toastr: ToastrService) {
  }


  iniciarSesionAdm(correo, password) {
    return this.auth.signInWithEmailAndPassword(correo, password).then( userA => {
        this.irNegocio(userA.user.uid)
    }).catch(error => {
      if (error.code === "auth/invalid-email") {
        this.toastr.error('Su correo está mal formateado o no existe', 'Error Iniciar sesión');
      } else {
        this.toastr.error('Correo o contraseña incorrecta', 'Error Iniciar sesión');
      }
    });
  }

  irNegocio(uidA) {
  return  this.db.list('Negocios', ref => ref.orderByChild('uidAdmin').equalTo(uidA)).snapshotChanges().pipe(first()).toPromise()
    .then(
      negocio => this.navegarAdministrador(negocio[0].key)
    )
  }

  iniciarSesionConductor(correo, password) {
    this.auth.signInWithEmailAndPassword(correo, password);
  }

  logout() {
    this.auth.signOut().then( () => {
      this.router.navigate(['login'])
    })
  }

  usuarioConecteado() {
    return this.auth.authState.pipe(first()).toPromise()
  }

  navegarAdministrador(keyEmpresa) {
    this.negocioService.idNegocio.next(keyEmpresa);
    this.router.navigate(['/empresa', keyEmpresa]);
  }


  olvidoPassword(email: string) {
    return this.auth.sendPasswordResetEmail(email);
  }
}
