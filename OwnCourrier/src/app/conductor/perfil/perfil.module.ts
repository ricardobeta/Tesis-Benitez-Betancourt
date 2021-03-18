import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PerfilRoutingModule } from './perfil-routing.module';
import { PerfilComponent } from './components/perfil/perfil.component';
import { MaterialModule } from 'src/app/material/material.module';


@NgModule({
  declarations: [PerfilComponent],
  imports: [
    CommonModule,
    PerfilRoutingModule,
    MaterialModule
  ]
})
export class PerfilModule { }
