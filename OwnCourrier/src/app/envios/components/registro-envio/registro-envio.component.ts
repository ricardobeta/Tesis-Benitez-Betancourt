import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registro-envio',
  templateUrl: './registro-envio.component.html',
  styleUrls: ['./registro-envio.component.scss']
})
export class RegistroEnvioComponent implements OnInit {
  
  formCliente: FormGroup;
  formDireccion: FormGroup;
  formInfoEnvio: FormGroup;
  formFecha: FormGroup;


  constructor(private formBuilder: FormBuilder) {
    this.buildFormCliente();
    this.buildFormDireccion();
    this.buildFormInfoEnvio();
    this.buildFormFecha();
  }

  ngOnInit(): void {
  }

  buildFormCliente() {
    this.formCliente = this.formBuilder.group(
      {
        nombreCompleto: ['', [Validators.required]],
        cedula: ['', [Validators.required]],
        correo: ['', [Validators.required]],
        telefonoD: ['', [Validators.required]],
        celular: ['', [Validators.required]],
      }
    );
  }

  buildFormDireccion() {
    this.formDireccion = this.formBuilder.group(
      {
        descripcion: ['', [Validators.required]],
        longitud: ['', [Validators.required]],
        latitud: ['', [Validators.required]],
        urlMapa: ['', [Validators.required]],
        zoom: ['', [Validators.required]],
      }
    );
  }

  buildFormInfoEnvio() {
    this.formInfoEnvio = this.formBuilder.group(
      {
        descripcion: ['', [Validators.required]],
        tipo: ['', [Validators.required]],
        prioridad: ['', [Validators.required]],
        peso: [0, [Validators.required]],
      }
    );
  }

  buildFormFecha() {
    this.formInfoEnvio = this.formBuilder.group(
      {
        fecha: ['', [Validators.required]],
      }
    );
  }

  confirmacionDir(event) {
    this.formDireccion.patchValue(event);
    this.formDireccion.markAsDirty();
    console.log(this.formDireccion.dirty);
  }


}
