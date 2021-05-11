import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConductorRoutingModule } from './conductor-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { MaterialModule } from '../material/material.module';
import { ZXingScannerModule } from '@zxing/ngx-scanner';

@NgModule({
  declarations: [LayoutComponent],
  imports: [
    CommonModule,
    ConductorRoutingModule,
    MaterialModule,
    ZXingScannerModule
  ]
})
export class ConductorModule { }
