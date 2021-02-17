import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpresaRoutingModule } from './empresa-routing.module';
import { InformacionComponent } from './components/informacion/informacion.component';
import { MaterialModule } from '../material/material.module';
import { InfoEmpresaComponent } from './components/info-empresa/info-empresa.component';
import { InfoSesionComponent } from './components/info-sesion/info-sesion.component';


@NgModule({
  declarations: [InformacionComponent, InfoEmpresaComponent, InfoSesionComponent],
  imports: [
    CommonModule,
    EmpresaRoutingModule,
    MaterialModule
  ]
})
export class EmpresaModule { }
