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
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConductorRoutingModule { }
