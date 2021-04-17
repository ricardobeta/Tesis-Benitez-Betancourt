import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/core/services/login/login.service';

@Component({
  selector: 'app-dialog-passw',
  templateUrl: './dialog-passw.component.html',
  styleUrls: ['./dialog-passw.component.scss']
})
export class DialogPasswComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogPasswComponent>,
              private formBuilder: FormBuilder,
              private loginService: LoginService,
              private toastr: ToastrService) {

            this.buildForm();
  }

  form: FormGroup;
  codeError: String;

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

    this.loginService.olvidoPassword(this.correoRecuperacion.value).then(correoR => {
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
    });
  }

  onNoClick() {
    this.dialogRef.close();
  }

  get correoRecuperacion(): AbstractControl {
    return this.form.get('correoRecuperacion');
  }

}
