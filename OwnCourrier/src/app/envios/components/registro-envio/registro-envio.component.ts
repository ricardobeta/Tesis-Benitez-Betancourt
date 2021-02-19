import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registro-envio',
  templateUrl: './registro-envio.component.html',
  styleUrls: ['./registro-envio.component.scss']
})
export class RegistroEnvioComponent implements OnInit {
  
  formCliente: FormGroup;
  formDirección: FormGroup;
  formEnvio: FormGroup;
  formFecha: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

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
}
