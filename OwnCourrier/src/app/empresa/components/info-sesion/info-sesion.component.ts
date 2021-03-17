import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-info-sesion',
  templateUrl: './info-sesion.component.html',
  styleUrls: ['./info-sesion.component.scss']
})
export class InfoSesionComponent implements OnInit {

  form: FormGroup;

  hideA = true;
  hideN = true;
  hideVN = true;

  constructor(private fromBuilder: FormBuilder,
              private toastr: ToastrService) {
    this.buildForm();
  }

  ngOnInit(): void {
  }

  buildForm() {
    this.form = this.fromBuilder.group(
      {
        nombreEmpresa: ['', Validators.required],
        correo: ['', Validators.required],
        passwordOld: [''],
        password: [''],
        verificarPass: ['']
      }
    );
  }

  saveInfo() {
    if (this.form.valid) {
      if (this.fieldPassword === this.fieldVerificarPass) {
        console.log(this.form.value);
        this.toastr.success('Actualizada correctamente', 'Información de la empresa');
      } else {
        this.toastr.error('Las contraseñas no coinciden', 'Error');
      }
    } else {
      this.toastr.error('Falta llenar campos obligatorios', 'Error');
    }
  }

  get fieldPassword(): AbstractControl {
    return this.form.get('password').value;
  }

  get fieldVerificarPass(): AbstractControl {
    return this.form.get('verificarPass').value;
  }
}
