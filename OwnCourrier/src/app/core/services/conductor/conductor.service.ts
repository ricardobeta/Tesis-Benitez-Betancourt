import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { Conductor } from '../../models/conductor.model';
import { NegocioService } from '../negocio/negocio.service';

@Injectable({
  providedIn: 'root'
})
export class ConductorService {
  constructor(private db: AngularFireDatabase,
    private storage: AngularFireStorage,
    private auth: AngularFireAuth,
    private negocioService: NegocioService,
    private router: Router) {

  }

  crearConductor(conductor: Conductor) {
    conductor.keyNegocio = this.negocioService.idNegocio.value;
    return this.crearUsuarioConductor(conductor.correo, conductor.cedula).then(
      user => {
        conductor.uidConductor = user.user.uid;
        return this.storage.upload(`Conductores/${conductor.uidConductor}-foto.jpg`, conductor.fileF)
          .then(
            storeF => {
              return storeF.ref.getDownloadURL().then(
                urlF => {
                  conductor.urlFoto = urlF;
                  delete conductor.fileF;
                  return this.storage.upload(`Conductores/${conductor.uidConductor}-licencia.jpg`, conductor.fileL)
                    .then(
                      storeL => {
                        return storeL.ref.getDownloadURL().then(
                          urlL => {
                            conductor.urlLicencia = urlL;
                            delete conductor.fileL;
                            return this.db.list(`Conductores`).push(conductor)
                          }
                        )
                      }
                    )
                }
              );
            }
          )
      }
    );
  }

  listaConductores() {
    return this.db.list('Conductores', ref => ref.orderByChild('keyNegocio').equalTo(this.negocioService.idNegocio.value)).snapshotChanges()
  }

  crearUsuarioConductor(email, password) {
    return this.auth.createUserWithEmailAndPassword(email, password)
  }

  asignarVehiculo(keyVehiculo, keyConductor, keyVehiculoP) {
    return this.db.object(`Conductores/${keyConductor}`).update({ keyVehiculo }).then(
      () => {
        if (keyVehiculo === '') {
          if (keyVehiculoP !== '') {
            return this.db.object(`Negocios/${this.negocioService.idNegocio.value}/vehiculos/${keyVehiculoP}`).update({ asignado: false })
          }
        } else {
          return this.db.object(`Negocios/${this.negocioService.idNegocio.value}/vehiculos/${keyVehiculo}`).update({ asignado: true })
            .then(
              () => {
                if (keyVehiculoP !== '') {
                  return this.db.object(`Negocios/${this.negocioService.idNegocio.value}/vehiculos/${keyVehiculoP}`).update({ asignado: false })
                }
              }
            )
        }
      }
    )
  }

  asignarZona(keyZona, keyConductor) {
    return this.db.object(`Conductores/${keyConductor}`).update({ keyZona })
  }

  conseguirConductor(key) {
    return this.db.object(`Conductores/${key}`).snapshotChanges();
  }

  conseguirEnviosXConductor(conductor: Conductor) {
    return this.db.list(`Negocios/${conductor.keyNegocio}/envios`, ref => ref.orderByChild('keyConductor').equalTo(this.negocioService.idConductor.value)).snapshotChanges()
  }

  eliminarConductor(conductor: Conductor) {
    this.storage.ref(`Conductores/${conductor.pathFoto}.jpg`).delete().subscribe(() => {
      this.storage.ref(`Conductores/${conductor.pathLicencia}.jpg`).delete().subscribe(() => {
        this.db.list('Conductores').remove(conductor.$key);
      })
    })
  }

  recuperarConductorID(id) {
    const sub$ = this.db.object(`Conductores/${id}`).snapshotChanges().subscribe(aux => {
      const conductor = aux.payload.toJSON() as Conductor;
      console.log(conductor)
      this.negocioService.idConductor.next(id);
      this.negocioService.idNegocio.next(conductor.keyNegocio);
      sub$.unsubscribe();
    });
  }

}
