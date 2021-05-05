import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Envio } from '../../models/envio.model';
import { NegocioService } from '../negocio/negocio.service';

@Injectable({
  providedIn: 'root'
})
export class EnvioService {


  constructor(private db: AngularFireDatabase, private negocioService: NegocioService) { }

  guardarEnvio(envio: Envio) {
    return this.db.list(`Negocios/${this.negocioService.idNegocio.value}/envios`).push(envio)
  }

  listaEnvios() {
    return this.db.list(`Negocios/${this.negocioService.idNegocio.value}/envios`).snapshotChanges()
  }

  enviosFecha(fecha: string) {
    return this.db.list(`Negocios/${this.negocioService.idNegocio.value}/envios`, ref => ref.orderByChild('fecha').equalTo(fecha)).snapshotChanges()
  }

  procesar(envio, keyConductor, keyEnvio) {
    return this.db.list(`Conductores/${keyConductor}/envios`).push(envio).then(
      () => {
        return this.db.object(`Negocios/${this.negocioService.idNegocio.value}/envios/${keyEnvio}`).update({estado: 'enProceso',keyConductor: keyConductor})
          .then(
            () => { 
              // Notificación Push Conductor
              return true}
          );
      }
    )
  }

}
