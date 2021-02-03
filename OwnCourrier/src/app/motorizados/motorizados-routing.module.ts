import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConductoresComponent } from './components/conductores/conductores.component';
import { CrearConductorComponent } from './components/crear-conductor/crear-conductor.component';
import { PrincipalComponent } from './components/principal/principal.component';

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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MotorizadosRoutingModule { }
