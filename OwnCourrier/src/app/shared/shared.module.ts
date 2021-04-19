import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapaComponent } from './mapa/mapa.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { MaterialModule } from '../material/material.module';
import { DialogPasswComponent } from './dialog-passw/dialog-passw.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [MapaComponent, DialogPasswComponent],
  imports: [
    CommonModule,
    LeafletModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: [
    MapaComponent,
    DialogPasswComponent,
    LeafletModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class SharedModule { }
