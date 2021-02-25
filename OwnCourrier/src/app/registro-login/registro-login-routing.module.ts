import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfirmacionComponent } from './components/confirmacion/confirmacion.component';
import { LoginComponent } from './components/login/login.component';
import { PrinpicalRegistroComponent } from './components/prinpical-registro/prinpical-registro.component';
import { RegistroAdministradorComponent } from './components/registro-administrador/registro-administrador.component';
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
      },
      {
        path: 'registroAdmin',
        component: RegistroAdministradorComponent
      },
      {
        path: '',
        redirectTo: 'registro',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistroLoginRoutingModule { }
