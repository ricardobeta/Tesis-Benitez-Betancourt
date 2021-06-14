import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Envio } from 'src/app/core/models/envio.model';
import { EnvioService } from 'src/app/core/services/envios/envio.service';
import { MyValidations } from 'src/app/core/utils/validadores';
import { GuiaComponent } from '../guia/guia.component';

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
  loading = false;

  prioridades = ['Alta', 'Media', 'Baja'];
  tipos = ['Postal', 'Alimentos', 'Mercaderia', 'Medico']

  constructor(private formBuilder: FormBuilder, private envioService: EnvioService, public dialog: MatDialog,
    private router: Router, private ruta: ActivatedRoute) {
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
        cedula: ['', [Validators.required, MyValidations.cedula]],
        correo: ['', [Validators.required, Validators.email]],
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
      this.loading = true;
      const envio: Envio = {
        cliente: this.formCliente.value,
        direccion: this.formDireccion.value,
        infoEnvio: this.formInfoEnvio.value,
        fecha: this.formFecha.get('fecha').value,
        estado: 'pendiente'
      }
      this.envioService.guardarEnvio(envio).then(
        value => {
          envio.$key =  value.key
          this.abrirGuia(envio);
          this.router.navigate(['../'], {relativeTo: this.ruta})
          this.loading = false
        }
      )
    }
  }

  formsValid() {
    return this.formCliente.valid && this.formDireccion.valid
      && this.formInfoEnvio.valid && this.formFecha.valid;
  }

  abrirGuia(envio: Envio) {
    const dialogRef = this.dialog.open(GuiaComponent, {
      width: 'auto',
      data: envio
    });
  }
}
