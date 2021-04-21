import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ZonasCoberturaRoutingModule } from './zonas-cobertura-routing.module';
import { ZonasNegocioComponent } from './zonas-negocio/zonas-negocio.component';


import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { LeafletDrawModule } from '@asymmetrik/ngx-leaflet-draw';
import { MaterialModule } from '../material/material.module';
import { FormZonaComponent } from './form-zona/form-zona.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ZonasNegocioComponent, FormZonaComponent],
  imports: [
    CommonModule,
    ZonasCoberturaRoutingModule,
    LeafletModule,
    LeafletDrawModule,
    MaterialModule,
    ReactiveFormsModule
  ],
})
export class ZonasCoberturaModule { }
