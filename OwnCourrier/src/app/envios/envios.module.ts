import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnviosRoutingModule } from './envios-routing.module';
import { PrincipalComponent } from './components/principal/principal.component';
import { RegistroEnvioComponent } from './components/registro-envio/registro-envio.component';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { AsignarEnviosComponent } from './components/asignar-envios/asignar-envios.component';
import { ReactiveFormsModule } from '@angular/forms';
import { GuiaComponent } from './components/guia/guia.component';
import { QRCodeModule } from 'angularx-qrcode';
import { NgxPrintModule } from 'ngx-print';
import { InfoEnvioComponent } from './components/info-envio/info-envio.component';


@NgModule({
  declarations: [PrincipalComponent, RegistroEnvioComponent, AsignarEnviosComponent, GuiaComponent, InfoEnvioComponent],
  imports: [
    CommonModule,
    EnviosRoutingModule,
    MaterialModule,
    SharedModule,
    ReactiveFormsModule,
    QRCodeModule,
    NgxPrintModule
  ]
})
export class EnviosModule { }
