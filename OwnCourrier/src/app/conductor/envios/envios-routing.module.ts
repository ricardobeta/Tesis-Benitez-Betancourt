import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrincipalComponent } from './components/principal/principal.component';
import { ScannerComponent } from './components/scanner/scanner.component';

const routes: Routes = [
  {
    path: '',
    component: PrincipalComponent
  },
  {
    path: 'scanner/:id',
    component: ScannerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnviosRoutingModule { }
