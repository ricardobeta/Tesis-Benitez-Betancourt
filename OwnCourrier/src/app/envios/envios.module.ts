import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnviosRoutingModule } from './envios-routing.module';
import { PrincipalComponent } from './components/principal/principal.component';
import { RegistroEnvioComponent } from './components/registro-envio/registro-envio.component';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { AsignarEnviosComponent } from './components/asignar-envios/asignar-envios.component';


@NgModule({
  declarations: [PrincipalComponent, RegistroEnvioComponent, AsignarEnviosComponent],
  imports: [
    CommonModule,
    EnviosRoutingModule,
    MaterialModule,
    SharedModule
  ]
})
export class EnviosModule { }
