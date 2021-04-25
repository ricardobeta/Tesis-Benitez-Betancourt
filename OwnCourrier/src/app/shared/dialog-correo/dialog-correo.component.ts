import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/core/services/login/login.service';
import { NegocioService } from 'src/app/core/services/negocio/negocio.service';

@Component({
  selector: 'app-dialog-correo',
  templateUrl: './dialog-correo.component.html',
  styleUrls: ['./dialog-correo.component.scss']
})
export class DialogCorreoComponent implements OnInit {

  form: FormGroup;
  codeError: String;

  constructor(public dialogRef: MatDialogRef<DialogCorreoComponent>,
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private toastr: ToastrService,
    private negocioService: NegocioService) {
      this.buildForm();
    }

  ngOnInit(): void {
  }

  buildForm() {
    this.form = this.formBuilder.group(
      {
        correoRecuperacion: ['', Validators.required],
      }
    );
  }

  recuperarContrasena() {
    console.log(this.correoRecuperacion.value);

    this.negocioService.cambiarEmail(this.correoRecuperacion.value).then(correoR => {
      console.log(correoR);
      this.toastr.success('Su petición se ha enviado exitosamente', 'Enviado');
    }).catch (error => {
      console.log(error.code);
      if (error.code === "auth/invalid-email") {
        this.toastr.error('Correo mal formateado', 'Error');
      } else if (error.code === "auth/user-not-found") {
        this.toastr.error('Correo no registrado', 'Error');
      } else {
        this.toastr.error('Problemas con el correo electrónico', 'Error');
      }
    }).finally( () => {
      this.onNoClick();
    });
  }

  onNoClick() {
    this.dialogRef.close();
  }

  get correoRecuperacion(): AbstractControl {
    return this.form.get('correoRecuperacion');
  }

}
