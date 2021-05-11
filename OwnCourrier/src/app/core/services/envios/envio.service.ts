import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { first, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Envio } from '../../models/envio.model';
import { NegocioService } from '../negocio/negocio.service';

@Injectable({
  providedIn: 'root'
})
export class EnvioService {


  constructor(private db: AngularFireDatabase, private negocioService: NegocioService, private httpClient: HttpClient) { }

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


  enviarMensaje(keyConductor) {
    console.log(keyConductor)
    return this.db.list(`Conductores/${keyConductor}/dispositivos`).valueChanges().pipe(
      map( (dispositivos)  => dispositivos.map( (dispositivo: any) =>  dispositivo.token as string)),
      first()
    ).toPromise().then(
      tokens => {
        console.log(tokens)
        if(tokens) {
          for (const key in tokens) {
            if (Object.prototype.hasOwnProperty.call(tokens, key)) {
              const token = tokens[key];
              console.log(token)
              let data = {
                "notification": {
                  "title": 'Envio Asignados',
                  "body": 'La empresa te ha asignado un nuevo trabajo para la fecha',
                  "click_action": '',
                  "icon": '',
                  "sound": 'default',
                  "image": ''
                },
                "to": token
              };
          
              let postData = JSON.stringify(data);
              let url = "https://fcm.googleapis.com/fcm/send";
              this.httpClient.post(url, postData, {
                headers: new HttpHeaders()
                  // put the server key here
                  .set('Authorization', `key=${environment.keyAutorizacion}`)
                  .set('Content-Type', 'application/json'),
              })
                .subscribe((response: Response) => {
                  console.log(response);
                },
                  (error: Response) => {
                    console.log(error);
                    console.log("error" + error);
                  });
            }
          }
        }
         return true
      }
    )
  }
}
