import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { NegocioService } from '../negocio/negocio.service';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private db: AngularFireDatabase,
    private storage: AngularFireStorage,
    private auth: AngularFireAuth,
    private negocioService: NegocioService) { }
  

  conseguirEmpresa(key){
    return this.db.object(`Negocios/${key}`).snapshotChanges();
  }

  conseguirEnvio(keyEmpresa, keyEnvio){
    return this.db.object(`Negocios/${keyEmpresa}/envios/${keyEnvio}`).snapshotChanges();
  }
    
}

