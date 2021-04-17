import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistroLoginRoutingModule } from './registro-login-routing.module';
import { PrinpicalRegistroComponent } from './components/prinpical-registro/prinpical-registro.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { ConfirmacionComponent } from './components/confirmacion/confirmacion.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RegistroAdministradorComponent } from './components/registro-administrador/registro-administrador.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [PrinpicalRegistroComponent, LoginComponent, RegistroComponent, ConfirmacionComponent, RegistroAdministradorComponent],
  imports: [
    CommonModule,
    RegistroLoginRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class RegistroLoginModule { }
