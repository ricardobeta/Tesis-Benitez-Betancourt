import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  form: FormGroup;

  constructor(private fromBuilder: FormBuilder) {
    this.buildForm();
  }

  ngOnInit(): void {
  }

  buildForm() {
    this.form = this.fromBuilder.group(
      {
        nombreCompleto: ['', Validators.required],
        fechaNacimiento: [''],
        correo: [''],
        celular: [''],
        direccion: [''],

      }
    );
  }

}
