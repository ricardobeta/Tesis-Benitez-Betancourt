import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrackingRoutingModule } from './tracking-routing.module';
import { EnvioClienteComponent } from './components/envio-cliente/envio-cliente.component';


@NgModule({
  declarations: [EnvioClienteComponent],
  imports: [
    CommonModule,
    TrackingRoutingModule
  ]
})
export class TrackingModule { }
