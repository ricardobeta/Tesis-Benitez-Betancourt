import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InicioRoutingModule } from './inicio-routing.module';
import { InicioComponent } from './components/inicio/inicio.component';
import { MaterialModule } from 'src/app/material/material.module';
import { ZXingScannerModule } from '@zxing/ngx-scanner';


@NgModule({
  declarations: [InicioComponent],
  imports: [
    CommonModule,
    InicioRoutingModule,
    MaterialModule,
    ZXingScannerModule
  ]
})
export class InicioModule { }
