import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  constructor(private fromBuilder: FormBuilder) {
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


}
