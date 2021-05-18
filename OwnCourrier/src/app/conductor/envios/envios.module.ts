import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnviosRoutingModule } from './envios-routing.module';
import { PrincipalComponent } from './components/principal/principal.component';
import { MaterialModule } from 'src/app/material/material.module';
import { QRCodeModule } from 'angularx-qrcode';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { ScannerComponent } from './components/scanner/scanner.component';
import { DialogProblemasComponent } from './components/dialog-problemas/dialog-problemas.component';


@NgModule({
  declarations: [PrincipalComponent, ScannerComponent, DialogProblemasComponent],
  imports: [
    CommonModule,
    EnviosRoutingModule,
    MaterialModule,
    QRCodeModule,
    ZXingScannerModule
  ]
})
export class EnviosModule { }
