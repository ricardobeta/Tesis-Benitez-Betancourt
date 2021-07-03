import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EnvioClienteComponent } from './components/envio-cliente/envio-cliente.component';

const routes: Routes = [
  {
    path: ':nombreEmpresa/:idEnvio',
    component: EnvioClienteComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrackingRoutingModule { }
