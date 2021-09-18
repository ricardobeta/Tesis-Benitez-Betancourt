import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { Vehiculo } from '../../models/vehiculo.model';
import { NegocioService } from '../negocio/negocio.service';

@Injectable({
  providedIn: 'root'
})
export class VehiculoService {

  constructor(private db: AngularFireDatabase,
    private storage: AngularFireStorage,
    private auth: AngularFireAuth,
    private negocioService: NegocioService) { }

    crearVehiculo(vehiculo: Vehiculo) {
      return this.storage.upload(`Vehiculos/${vehiculo.pathMatricula}.jpg`, vehiculo.fileM).then(
        storeM => {
          return storeM.ref.getDownloadURL().then(
            url => {
              vehiculo.urlMatricula = url;
              delete vehiculo.fileM
              return this.db.list(`Negocios/${this.negocioService.idNegocio.value}/vehiculos`).push(vehiculo)
            }
          )
        }
      )
    }

    listaVehiculos() {
      return this.db.list(`Negocios/${this.negocioService.idNegocio.value}/vehiculos`).snapshotChanges()
    }

    listaVehiculosNoAsignados() {
      return this.db.list(`Negocios/${this.negocioService.idNegocio.value}/vehiculos`, ref => ref.orderByChild('asignado').equalTo(false)).snapshotChanges()
    }

    eliminarVehiculo(vehiculo: Vehiculo) {
      this.storage.ref(`Vehiculos/${vehiculo.pathMatricula}.jpg`).delete().subscribe(() => {
        // tslint:disable-next-line: no-string-literal
        this.db.list(`Negocios/${this.negocioService.idNegocio.value}/vehiculos`).remove(vehiculo['$key']);
      });
    }
}
