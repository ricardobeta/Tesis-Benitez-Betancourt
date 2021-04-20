import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./registro-login/registro-login.module').then(m => m.RegistroLoginModule)
  },
  {
    path: 'conductor',
    loadChildren: () => import('./conductor/conductor.module').then( m => m.ConductorModule)
  },
  {
    path: 'empresa/:id',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./inicio/inicio.module').then(m => m.InicioModule)
      },
      {
        path: 'informacion',
        loadChildren: () => import('./empresa/empresa.module').then(m => m.EmpresaModule)
      },
      {
        path: 'motorizados',
        loadChildren: () => import('./motorizados/motorizados.module').then(m => m.MotorizadosModule)
      },
      {
        path: 'envios',
        loadChildren: () => import('./envios/envios.module').then( m => m.EnviosModule)
      },
      {
        path: 'clientes',
        loadChildren: () => import('./clientes/clientes.module').then( m => m.ClientesModule)
      },
      {
        path: 'zonas-cobertura',
        loadChildren: () => import('./zonas-cobertura/zonas-cobertura.module').then(m=> m.ZonasCoberturaModule)
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {
      preloadingStrategy: PreloadAllModules,
      relativeLinkResolution: 'legacy',
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled'
    })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
