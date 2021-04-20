import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ZonasCoberturaRoutingModule } from './zonas-cobertura-routing.module';
import { ZonasNegocioComponent } from './zonas-negocio/zonas-negocio.component';


import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { LeafletDrawModule } from '@asymmetrik/ngx-leaflet-draw';

@NgModule({
  declarations: [ZonasNegocioComponent],
  imports: [
    CommonModule,
    ZonasCoberturaRoutingModule,
    LeafletModule,
    LeafletDrawModule
  ]
})
export class ZonasCoberturaModule { }
