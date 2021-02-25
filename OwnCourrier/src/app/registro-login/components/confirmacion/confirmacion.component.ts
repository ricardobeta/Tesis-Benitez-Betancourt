import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RegistroNegocio } from 'src/app/core/models/registro.model';
import { RegistroService } from 'src/app/core/services/registro/registro.service';

@Component({
  selector: 'app-confirmacion',
  templateUrl: './confirmacion.component.html',
  styleUrls: ['./confirmacion.component.scss']
})
export class ConfirmacionComponent implements OnInit {
  form: FormGroup;
  dataRegistro: RegistroNegocio;
  verificacion: Promise<firebase.default.auth.ConfirmationResult>;
  errorCode = false;
  constructor(public dialogRef: MatDialogRef<ConfirmacionComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private formBuilder: FormBuilder,
    private registroService: RegistroService,
    private router: Router)  {
      this.buildForm();
    }

ngOnInit(): void {
this.dataRegistro = this.data.registro;
this.verificacion = this.registroService.verificacionSMS(this.data.recaptchaVerifier, this.data.registro.celular);
}

buildForm(){
this.form = this.formBuilder.group({
codigo: ['', Validators.required]
});
}

verificarSMS(event: Event){
event.preventDefault();
if(this.form.valid) {
  this.verificacion.then(
    conf => {
      conf.confirm(this.form.get('codigo').value).then(
        userPhone => {
          console.log('Confirmación')
          //Guarda los datos hasta continuar con el registro del Usuario Admin
          this.dataRegistro.uidPhone = userPhone.user.uid;
          this.registroService.negocio.next(this.dataRegistro);
          this.router.navigateByUrl('registroAdmin')
          this.dialogRef.close();
        }
      )
    }
  )
}
}

}
