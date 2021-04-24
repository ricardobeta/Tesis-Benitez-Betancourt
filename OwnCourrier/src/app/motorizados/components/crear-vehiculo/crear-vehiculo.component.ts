import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { VehiculoService } from 'src/app/core/services/vehiculo/vehiculo.service';

@Component({
  selector: 'app-crear-vehiculo',
  templateUrl: './crear-vehiculo.component.html',
  styleUrls: ['./crear-vehiculo.component.scss']
})
export class CrearVehiculoComponent implements OnInit {
  form: FormGroup
  loading = false

  constructor(private formBuilder: FormBuilder, private toastService: ToastrService,
    private router: Router, private ruta: ActivatedRoute, private vehiculoService: VehiculoService) {
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
        pathMatricula: ['', [Validators.required]],
        estado: 'disponible',
        asignado: false
      }
    );
  }

  cargarFotoMatricula(event) {
    this.fileMField.setValue(event.target.files[0]);
    this.form.get('pathMatricula').setValue(Math.random().toString(36).substring(2))
  }

  eliminarFotoMatricula() {
    this.fileMField.setValue(null);
    this.form.get('pathMatricula').setValue('')
  }


  guardarVehiculo(event: Event) {
    event.preventDefault();
    if(this.form.valid) {
      this.loading = true
      this.vehiculoService.crearVehiculo(this.form.value).then(
        value => {
          console.log(value);
          this.loading = false;
          this.router.navigate(['../vehiculos'], {relativeTo: this.ruta})
          this.toastService.success('Se guardo tu vehículo Correctamente', 'Nuevo Vehículo')
        }
      )
    } else {
      this.form.markAllAsTouched()
    }
  }

  get fileMField(): AbstractControl {
    return this.form.get('fileM')
  }

  get placaField(): AbstractControl {
    return this.form.get('placa')
  }
}
