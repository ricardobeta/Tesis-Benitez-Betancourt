import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InformacionComponent } from './components/informacion/informacion.component';

const routes: Routes = [
  {
    path: '',
    component: InformacionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpresaRoutingModule { }
