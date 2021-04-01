import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

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
        cedula: ['', Validators.required],
        fechaNacimiento: ['', Validators.required],
        correo: ['', Validators.required],
        celular: ['', Validators.required],
        direccion: ['', Validators.required],
        fileF: [null, [Validators.required]],
        pathFoto: [''],
        urlFoto: ['']

      }
    );
  }

  cargarFotoPerfil(event) {
    this.file.setValue(event.target.files[0]);
  }

  eliminarFotoPerfil() {
    this.file.setValue(null);
  }

  guardar(event: Event) {
    event.preventDefault();
    if(this.form.valid) {
      console.log(this.form.value);
    }
  }

  get file(): AbstractControl {
    return this.form.get('fileF')
  }


}
