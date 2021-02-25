import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrincipalComponent } from './components/principal/principal.component';
import { RegistroEnvioComponent } from './components/registro-envio/registro-envio.component';


const routes: Routes = [
  {
    path: '',
    component: PrincipalComponent
  },
  {
    path: 'registro',
    component: RegistroEnvioComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnviosRoutingModule { }
