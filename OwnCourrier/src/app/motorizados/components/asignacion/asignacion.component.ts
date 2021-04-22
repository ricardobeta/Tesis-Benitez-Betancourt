import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Conductor } from 'src/app/core/models/conductor.model';
import { Vehiculo } from 'src/app/core/models/vehiculo.model';
import { ZonaCobertura } from 'src/app/core/models/zona-cobertura.model';
import { NegocioService } from 'src/app/core/services/negocio/negocio.service';
import { VehiculoService } from 'src/app/core/services/vehiculo/vehiculo.service';

@Component({
  selector: 'app-asignacion',
  templateUrl: './asignacion.component.html',
  styleUrls: ['./asignacion.component.scss']
})
export class AsignacionComponent implements OnInit {

  form: FormGroup;

  vehiculos: Vehiculo[] = [];
  zonas: ZonaCobertura[] = [];



  constructor( public dialogRef: MatDialogRef<AsignacionComponent>,
    @Inject(MAT_DIALOG_DATA) public conductor: Conductor,
    private fb: FormBuilder, private vehiculoService: VehiculoService,
    private negocioService: NegocioService) {
      this.buildForm();
    }

  ngOnInit(): void {
    this.form.patchValue(this.conductor)
    const $sub = this.vehiculoService.listaVehiculosNoAsignados().subscribe(
      vehiculosDB => {
        this.vehiculos = [];
         vehiculosDB.forEach(
           vehiculoDB => {
            const vehiculo  = vehiculoDB.payload.toJSON() as Vehiculo;
            vehiculo.$key = vehiculoDB.key;
            this.vehiculos.push(vehiculo);
           }
         );
         $sub.unsubscribe();
      }
    );

    const $sub2 = this.negocioService.listaZonasCobertura().subscribe(
      zonasDB => {
        this.zonas = [];
         zonasDB.forEach(
           zonaDB => {
            const zona  = zonaDB.payload.toJSON() as ZonaCobertura;
            zona.$key = zonaDB.key;
            this.zonas.push(zona);
           }
         );
         $sub2.unsubscribe();
      }
    );
  }

  buildForm() {
    this.form = this.fb.group({
      keyVehiculo: [''],
      keyZona: ['']
    });
  }

  saveAsignacion() {
    
  }

}
