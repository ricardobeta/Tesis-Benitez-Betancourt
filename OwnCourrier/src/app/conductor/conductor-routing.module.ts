import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  {
    path: ':id',
    component: LayoutComponent,
    children: [ 
      {
        path: '',
        loadChildren: () => import('./inicio/inicio.module').then( m => m.InicioModule)
      },
      {
        path: 'inicio',
        loadChildren: () => import('./inicio/inicio.module').then(m => m.InicioModule)
      },
      {
        path: 'envios',
        loadChildren: () => import('./envios/envios.module').then(m => m.EnviosModule)
      },
      // {
      //   path: 'perfil',
      //   loadChildren: () => import('./motorizados/motorizados.module').then(m => m.MotorizadosModule)
      // },
      // {
      //   path: 'configuracion',
      //   loadChildren: () => import('./envios/envios.module').then( m => m.EnviosModule)
      // }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConductorRoutingModule { }
