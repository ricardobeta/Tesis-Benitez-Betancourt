import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Conductor } from 'src/app/core/models/conductor.model';
import { ConductorService } from 'src/app/core/services/conductor/conductor.service';
import { MyValidations } from 'src/app/core/utils/validadores';

@Component({
  selector: 'app-crear-conductor',
  templateUrl: './crear-conductor.component.html',
  styleUrls: ['./crear-conductor.component.scss']
})
export class CrearConductorComponent implements OnInit {
  form: FormGroup;
  loading = false;
  constructor(private formBuilder: FormBuilder, private conductorService: ConductorService, private toastService: ToastrService,
              private router: Router, private ruta: ActivatedRoute) {
    this.buildForm();
  }

  ngOnInit(): void {
    console.log(this.ruta)
  }

  buildForm() {
    this.form = this.formBuilder.group({
      cedula: ['', [Validators.required, MyValidations.cedula]],
      celular: ['', [Validators.required]],
      correo: ['', [Validators.required, Validators.email]],
      direccion: ['', [Validators.required]],
      fechaNacimiento: ['', [Validators.required]],
      nombreCompleto: ['', [Validators.required]],
      fileF: [null, [Validators.required]],
      fileL: [null, [Validators.required]],
      estado: 'disponible'
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
      this.loading = true;
      this.conductorService.crearConductor(this.form.value as Conductor).
      then(
        value => {
          console.log(value);
          this.toastService.success('Conductor Guardado Correctamente', 'Nuevo Conductor')
          this.router.navigate(['../conductores'], {relativeTo: this.ruta})
          this.loading = false
        }
      )
    } else {
      this.form.markAllAsTouched()
    }
  }

  get filefField(): AbstractControl {
    return this.form.get('fileF')
  }

  get filelField(): AbstractControl {
    return this.form.get('fileL')
  }
}
