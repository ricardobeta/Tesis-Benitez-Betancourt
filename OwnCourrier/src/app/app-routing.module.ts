import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./registro-login/registro-login.module').then(m => m.RegistroLoginModule)
  },
  {
    path: ':id',
    component: LayoutComponent,
    children: [
      {
        path: 'inicio',
        loadChildren: () => import('./inicio/inicio.module').then(m => m.InicioModule)
      },
      {
        path: 'informacion',
        loadChildren: () => import('./empresa/empresa.module').then(m => m.EmpresaModule)
      },
      {
        path: 'motorizados',
        loadChildren: () => import('./motorizados/motorizados.module').then(m => m.MotorizadosModule)
      }  
    ]
  },
  {
    path: '',
    loadChildren: () => import('./registro-login/registro-login.module').then(m => m.RegistroLoginModule)
  }
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
