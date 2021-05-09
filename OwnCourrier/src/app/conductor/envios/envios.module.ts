import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnviosRoutingModule } from './envios-routing.module';
import { PrincipalComponent } from './components/principal/principal.component';
import { MaterialModule } from 'src/app/material/material.module';
import { QRCodeModule } from 'angularx-qrcode';


@NgModule({
  declarations: [PrincipalComponent],
  imports: [
    CommonModule,
    EnviosRoutingModule,
    MaterialModule,
    QRCodeModule
  ]
})
export class EnviosModule { }
