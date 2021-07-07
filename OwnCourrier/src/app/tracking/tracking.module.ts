import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrackingRoutingModule } from './tracking-routing.module';
import { EnvioClienteComponent } from './components/envio-cliente/envio-cliente.component';
import { MaterialModule } from '../material/material.module';


@NgModule({
  declarations: [EnvioClienteComponent],
  imports: [
    CommonModule,
    TrackingRoutingModule,
    MaterialModule 
  ]
})
export class TrackingModule { }
