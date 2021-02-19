import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapaComponent } from './mapa/mapa.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { MaterialModule } from '../material/material.module';


@NgModule({
  declarations: [MapaComponent],
  imports: [
    CommonModule,
    LeafletModule,
    MaterialModule
  ],
  exports: [
    MapaComponent,
    LeafletModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class SharedModule { }
