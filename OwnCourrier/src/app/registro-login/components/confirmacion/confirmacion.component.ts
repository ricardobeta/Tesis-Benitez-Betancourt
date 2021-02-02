import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RegistroEmpresa } from 'src/app/core/models/registro.model';

@Component({
  selector: 'app-confirmacion',
  templateUrl: './confirmacion.component.html',
  styleUrls: ['./confirmacion.component.scss']
})
export class ConfirmacionComponent implements OnInit {
  form: FormGroup;
  dataRegistro: RegistroEmpresa;
  verificacion: Promise<firebase.default.auth.ConfirmationResult>;
  errorCode = false;
  formBuilder: any;
  constructor(public dialogRef: MatDialogRef<ConfirmacionComponent>,
    @Inject(MAT_DIALOG_DATA) public data)  {
      this.buildForm();
    }

ngOnInit(): void {
this.dataRegistro = this.data.registro;
// this.verificacion = this.registroService.sms(this.data.recaptchaVerifier, this.data.registro.celular);
}

buildForm(){
this.form = this.formBuilder.group({
codigo: ['', Validators.required]
});
}

verificarSMS(event: Event){
event.preventDefault();
}

}
