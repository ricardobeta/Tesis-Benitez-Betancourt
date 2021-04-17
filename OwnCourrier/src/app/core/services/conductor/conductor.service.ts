import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { Conductor } from '../../models/conductor.model';
import { NegocioService } from '../negocio/negocio.service';

@Injectable({
  providedIn: 'root'
})
export class ConductorService {
  constructor(private db: AngularFireDatabase,
    private storage: AngularFireStorage,
    private auth: AngularFireAuth,
    private negocioService: NegocioService) {

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
    return this.db.list('Conductores').snapshotChanges()
  }

  crearUsuarioConductor(email, password) {
    return this.auth.createUserWithEmailAndPassword(email, password)
  }
}
