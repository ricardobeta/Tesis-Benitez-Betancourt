import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Envio } from '../../models/envio.model';
import { NegocioService } from '../negocio/negocio.service';

@Injectable({
  providedIn: 'root'
})
export class SendEmailService {

  constructor(private firestore: AngularFirestore, private negocioService: NegocioService) { }

  sendEmail(envio: Envio, key: string) {
    return this.firestore.collection('mail').add({
      to: envio.cliente.correo,
      message: {
        subject: `Tu envio de ${this.negocioService.negocio.value.nombreEmpresa} se ha registrado correctamente`,
        text: `Puedes seguir el tracking de tu pedido en el siguiente link: /n https://owncourrier.web.app/${this.negocioService.negocio.value.nombreEmpresa}/${key} `
      }
    })
  }
}
