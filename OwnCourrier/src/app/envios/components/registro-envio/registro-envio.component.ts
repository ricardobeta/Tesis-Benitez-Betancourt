import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Envio } from 'src/app/core/models/envio.model';

@Component({
  selector: 'app-registro-envio',
  templateUrl: './registro-envio.component.html',
  styleUrls: ['./registro-envio.component.scss']
})
export class RegistroEnvioComponent implements OnInit {

  formInfoEnvio: FormGroup;
  formCliente: FormGroup;
  formDireccion: FormGroup;
  formFecha: FormGroup;


  prioridades = ['Alta', 'Media', 'Baja'];
  tipos = ['Postal', 'Alimentos', 'Mercaderia', 'Medico']

  constructor(private formBuilder: FormBuilder) {
    this.buildFormCliente();
    this.buildFormDireccion();
    this.buildFormInfoEnvio();
    this.buildFormFecha()
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
    this.formFecha = this.formBuilder.group(
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

  guardarEnvio(event: Event) {
    if(this.formsValid()) {
      const envio: Envio = {
        cliente: this.formCliente.value,
        direccion: this.formDireccion.value,
        infoEnvio: this.formInfoEnvio.value,
        fecha: this.formFecha.get('fecha').value
      }
      console.log(envio)
    }
  }

  formsValid() {
    return this.formCliente.valid && this.formDireccion.valid
      && this.formInfoEnvio.valid && this.formFecha.valid;
  }
}
