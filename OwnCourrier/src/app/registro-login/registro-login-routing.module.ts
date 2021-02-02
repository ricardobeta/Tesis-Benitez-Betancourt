import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfirmacionComponent } from './components/confirmacion/confirmacion.component';
import { PrinpicalRegistroComponent } from './components/prinpical-registro/prinpical-registro.component';
import { RegistroComponent } from './components/registro/registro.component';

const routes: Routes = [
  {
    path: '',
    component: PrinpicalRegistroComponent,
    children: [
      {
        path: '',
        component: RegistroComponent
      },
      {
        path: 'confirmacion',
        component: ConfirmacionComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistroLoginRoutingModule { }
