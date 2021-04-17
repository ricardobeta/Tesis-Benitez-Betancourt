import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
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
              private storage: AngularFireStorage,
              public auth: AngularFireAuth) { }


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

  modificarInfoNegocio(negocio: Negocio, id) {

    return this.storage.upload(`${id}/${negocio.pathLogo}.jpg`, negocio.fileLogo).then(
      uploaded => {
        return uploaded.ref.getDownloadURL().then(
          url => {
            negocio.urlLogo = url;
            //this.negocio.next(negocio);
            delete negocio.fileLogo;
            return this.db.object(`Negocios/${id}`).update(negocio).then(()=>{this.recuperarNegocioID(this.idNegocio.value);});
          }
        );
      }
    );
  }

cambiarPassword(email: string) {
  return this.auth.sendPasswordResetEmail(email);
}

cambiarEmail(newEmail: string) {
  return   this.auth.currentUser.then(
    user => {
      return user.updateEmail(newEmail)
    }
  )
}
}
