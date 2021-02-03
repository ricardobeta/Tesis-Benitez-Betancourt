import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-crear-conductor',
  templateUrl: './crear-conductor.component.html',
  styleUrls: ['./crear-conductor.component.scss']
})
export class CrearConductorComponent implements OnInit {
  form: FormGroup;
  constructor(private formBuilder: FormBuilder) {
    this.buildForm();
  }

  ngOnInit(): void {
  }

  buildForm() {
    this.form = this.formBuilder.group({
      cedula: ['', [Validators.required]],
      celular: ['', [Validators.required]],
      correo: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      fechaNacimiento: ['', [Validators.required]],
      nombreCompleto: ['', [Validators.required]],
      fileF: [null, [Validators.required]],
      fileL: [null, [Validators.required]]
    });
  }

  cargarFotoConductor(event) {
    this.filefField.setValue(event.target.files[0]);
  }


  cargarFotoLicencia(event) {
    this.filelField.setValue(event.target.files[0]);
  }

  eliminarFotoConductor() {
    this.filefField.setValue(null);
  }

  eliminarLicencia() {
    this.filelField.setValue(null);
  }

  guardarConductor(event: Event) {
    event.preventDefault();
    if(this.form.valid) {
      console.log(this.form.value);
    }
  }

  get filefField(): AbstractControl {
    return this.form.get('fileF')
  }

  get filelField(): AbstractControl {
    return this.form.get('fileL')
  }
}
