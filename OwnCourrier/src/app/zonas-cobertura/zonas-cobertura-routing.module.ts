import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ZonasNegocioComponent } from './zonas-negocio/zonas-negocio.component';

const routes: Routes = [{
  path: '',
  component: ZonasNegocioComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ZonasCoberturaRoutingModule { }
