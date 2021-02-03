import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-crear-vehiculo',
  templateUrl: './crear-vehiculo.component.html',
  styleUrls: ['./crear-vehiculo.component.scss']
})
export class CrearVehiculoComponent implements OnInit {
  form: FormGroup
  constructor(private formBuilder: FormBuilder) {
    this.buildForm();
  }

  ngOnInit(): void {
  }

  buildForm() {
    this.form = this.formBuilder.group(
      {
        marca: ['', [Validators.required]],
        placa: ['', [Validators.required]],
        color: ['', [Validators.required]],
        fileM: [null, [Validators.required]],
      }
    );
  }

  cargarFotoMatricula(event) {
    this.fileMField.setValue(event.target.files[0]);
  }

  eliminarFotoMatricula() {
    this.fileMField.setValue(null);
  }


  guardarVehiculo(event: Event) {
    event.preventDefault();
    if(this.form.valid) {
      console.log(this.form.value);
    }
  }

  get fileMField(): AbstractControl {
    return this.form.get('fileM')
  }
}
