import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { RegistroNegocio } from 'src/app/core/models/registro.model';
import { RegistroService } from 'src/app/core/services/registro/registro.service';
import { ConfirmacionComponent } from '../confirmacion/confirmacion.component';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit, AfterViewInit {
  form: FormGroup;
  recaptchaVerifier: firebase.default.auth.RecaptchaVerifier;
  errorCap = false;
  constructor(public dialog: MatDialog,
    private registroService: RegistroService,
    private fromBuilder: FormBuilder) {
      this.buildForm();
    }

  ngAfterViewInit(): void {
    this.recaptchaVerifier = this.registroService.recaptcha();
    this.recaptchaVerifier.render();
  }

  ngOnInit(): void {
    this.registroService.verificado.subscribe(value => {
      this.captchaField.setValue(value);
      this.errorCap = false;
    })
  }

  buildForm() {
    this.form = this.fromBuilder.group(
      {
        nombreEmpresa: ['', Validators.required],
        celular: ['',  [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
        captcha: [false, Validators.requiredTrue]
      }
    );
  }

  get captchaField() {
    return this.form.get('captcha');
  }

  registrarEmpresa(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      const dialogRef = this.dialog.open(ConfirmacionComponent, {
        minWidth: '200px',
        data: {
          registro: (this.form.value as RegistroNegocio),
          recaptchaVerifier: this.recaptchaVerifier
        },
        closeOnNavigation: true
      });
    } else {
      this.form.markAsTouched();
      if (!this.captchaField.valid) {
        this.errorCap = true;
      }
    }
  }
}
