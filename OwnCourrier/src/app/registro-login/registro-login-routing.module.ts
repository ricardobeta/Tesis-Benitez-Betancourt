import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfirmacionComponent } from './components/confirmacion/confirmacion.component';
import { LoginComponent } from './components/login/login.component';
import { PrinpicalRegistroComponent } from './components/prinpical-registro/prinpical-registro.component';
import { RegistroComponent } from './components/registro/registro.component';

const routes: Routes = [
  {
    path: '',
    component: PrinpicalRegistroComponent,
    children: [
      {
        path: 'registro',
        component: RegistroComponent
      },
      {
        path: 'login',
        component: LoginComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistroLoginRoutingModule { }
