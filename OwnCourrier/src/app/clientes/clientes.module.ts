import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientesRoutingModule } from './clientes-routing.module';
import { PrincipalComponent } from './components/principal/principal.component';
import { MaterialModule } from '../material/material.module';


@NgModule({
  declarations: [PrincipalComponent],
  imports: [
    CommonModule,
    ClientesRoutingModule,
    MaterialModule
  ]
})
export class ClientesModule { }
