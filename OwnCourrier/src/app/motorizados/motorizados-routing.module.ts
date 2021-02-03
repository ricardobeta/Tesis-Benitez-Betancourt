import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConductoresComponent } from './components/conductores/conductores.component';
import { CrearConductorComponent } from './components/crear-conductor/crear-conductor.component';
import { CrearVehiculoComponent } from './components/crear-vehiculo/crear-vehiculo.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { VehiculosComponent } from './components/vehiculos/vehiculos.component';

const routes: Routes = [
  {
    path: '',
    component: PrincipalComponent
  },
  {
    path: 'conductores',
    component: ConductoresComponent
  },
  {
    path: 'crearConductor',
    component: CrearConductorComponent
  },
  {
    path: 'vehiculos',
    component: VehiculosComponent
  },
  {
    path: 'crearVehiculo',
    component: CrearVehiculoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MotorizadosRoutingModule { }
