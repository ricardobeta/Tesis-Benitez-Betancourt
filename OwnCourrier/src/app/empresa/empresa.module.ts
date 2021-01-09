import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpresaRoutingModule } from './empresa-routing.module';
import { InformacionComponent } from './components/informacion/informacion.component';
import { MaterialModule } from '../material/material.module';


@NgModule({
  declarations: [InformacionComponent],
  imports: [
    CommonModule,
    EmpresaRoutingModule,
    MaterialModule
  ]
})
export class EmpresaModule { }
