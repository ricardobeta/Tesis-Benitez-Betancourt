import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { AngularFireStorage } from '@angular/fire/storage';
import { BehaviorSubject } from 'rxjs';
import { first, mergeMapTo } from 'rxjs/operators';
import { Central } from '../../models/central.model';
import { Negocio } from '../../models/negocio';
import { ZonaCobertura } from '../../models/zona-cobertura.model';

@Injectable({
  providedIn: 'root'
})
export class NegocioService {
  public idConductor= new BehaviorSubject<string>(undefined);
  public idNegocio = new BehaviorSubject<string>(undefined);
  public negocio = new BehaviorSubject<Negocio>(undefined);

  constructor(private db: AngularFireDatabase,
    private storage: AngularFireStorage,
    public auth: AngularFireAuth,
    private afMessaging: AngularFireMessaging) { }


  recuperarNegocioID(id) {
    const sub$ = this.db.object(`Negocios/${id}`).snapshotChanges().subscribe(auxNegocio => {
      this.idNegocio.next(auxNegocio.key);
      this.negocio.next(auxNegocio.payload.toJSON() as Negocio);
      sub$.unsubscribe();
    });
  }

  informacionNegocio() {
    return this.db.object(`Negocios/${this.idNegocio.value}`).valueChanges()
  }

  modificarInfoNegocio(negocio: Negocio, id) {

    return this.storage.upload(`${id}/${negocio.pathLogo}.jpg`, negocio.fileLogo).then(
      uploaded => {
        return uploaded.ref.getDownloadURL().then(
          url => {
            negocio.urlLogo = url;
            //this.negocio.next(negocio);
            delete negocio.fileLogo;
            return this.db.object(`Negocios/${id}`).update(negocio).then(() => { this.recuperarNegocioID(this.idNegocio.value); });
          }
        );
      }
    );
  }

  cambiarPassword(email: string) {
    return this.auth.sendPasswordResetEmail(email);
  }

  cambiarEmail(newEmail: string) {
    return this.auth.currentUser.then(
      user => {
        user.updateEmail(newEmail)
      }
    )
  }

  //Zonas Cobertura


  agregarZona(zona: ZonaCobertura) {
    return  this.db.list(`Negocios/${this.idNegocio.value}/zonasCobertura`).push(zona)
  }

  listaZonasCobertura() {
    return this.db.list(`Negocios/${this.idNegocio.value}/zonasCobertura`).snapshotChanges();
  }

  eliminarZonaCobertura(key) {
    return this.db.object(`Negocios/${this.idNegocio.value}/zonasCobertura/${key}`).remove()
  }


  modificarZona(zona:ZonaCobertura, key) {
    delete zona.$key;
    return this.db.object(`Negocios/${this.idNegocio.value}/zonasCobertura/${key}`).update(zona);
  }

  editarCentral(central: Central)  {
    return this.db.object(`Negocios/${this.idNegocio.value}/central`).update(central)
  }

  recuperarCentral() {
    return this.db.object(`Negocios/${this.idNegocio.value}/central`).valueChanges()
  }

  registrarToken() {
    this.afMessaging.requestPermission
    .pipe(mergeMapTo(this.afMessaging.tokenChanges))
    .subscribe(
      (token) => {
        const p = `Conductores/${this.idConductor.value}/dispositivos`; 
        this.db.list(p, ref => ref.orderByChild('token').equalTo(token)).valueChanges().pipe(first()).toPromise()
        .then(
          val => {
            console.log(val)
            if(val.length == 0) {
              this.db.list(p).push({token})
            }
          }
        )
      },
      (error) => { console.error(error); }
    );
  }
}
