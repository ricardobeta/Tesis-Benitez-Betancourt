import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapaComponent } from './mapa/mapa.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { MaterialModule } from '../material/material.module';
import { DialogPasswComponent } from './dialog-passw/dialog-passw.component';


@NgModule({
  declarations: [MapaComponent, DialogPasswComponent],
  imports: [
    CommonModule,
    LeafletModule,
    MaterialModule
  ],
  exports: [
    MapaComponent,
    DialogPasswComponent,
    LeafletModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class SharedModule { }
