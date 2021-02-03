import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MotorizadosRoutingModule } from './motorizados-routing.module';
import { PrincipalComponent } from './components/principal/principal.component';
import { MaterialModule } from '../material/material.module';
import { ConductoresComponent } from './components/conductores/conductores.component';
import { VehiculosComponent } from './components/vehiculos/vehiculos.component';
import { CrearConductorComponent } from './components/crear-conductor/crear-conductor.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [PrincipalComponent, ConductoresComponent, VehiculosComponent, CrearConductorComponent],
  imports: [
    CommonModule,
    MotorizadosRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class MotorizadosModule { }
