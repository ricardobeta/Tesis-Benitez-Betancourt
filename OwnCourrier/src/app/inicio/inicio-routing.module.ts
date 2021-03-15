import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';

const routes: Routes = [
  {
    path: '',
    component: InicioComponent
  },
  {
    path: '',
    children: [
      {
        path: 'informacion',
        loadChildren: () => import('../empresa/empresa.module').then(m => m.EmpresaModule)
      },
      {
        path: 'motorizados',
        loadChildren: () => import('../motorizados/motorizados.module').then(m => m.MotorizadosModule)
      },
      {
        path: 'envios',
        loadChildren: () => import('../envios/envios.module').then( m => m.EnviosModule)
      },
      {
        path: 'clientes',
        loadChildren: () => import('../clientes/clientes.module').then( m => m.ClientesModule)
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InicioRoutingModule { }
