import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { BehaviorSubject } from 'rxjs';
import { Negocio } from '../../models/negocio';

@Injectable({
  providedIn: 'root'
})
export class NegocioService {

  public idNegocio = new BehaviorSubject<string>(undefined);
  public negocio = new BehaviorSubject<Negocio>(undefined);

  constructor(private db: AngularFireDatabase,
              private storage: AngularFireStorage) { }


  informacionNegocio() {
    return this.db.object(`Negocios/${this.idNegocio.value}`).valueChanges()
  }
}
