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


  recuperarNegocioID(id) {
    const sub$ = this.db.object(`Negocios/${id}`).snapshotChanges().subscribe( auxNegocio => {
       this.idNegocio.next(auxNegocio.key);
       this.negocio.next(auxNegocio.payload.toJSON() as Negocio);
       sub$.unsubscribe();
    });
  }

  informacionNegocio() {
    return this.db.object(`Negocios/${this.idNegocio.value}`).valueChanges()
  }
}
