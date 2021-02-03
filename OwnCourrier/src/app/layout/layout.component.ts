import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset, , Breakpoints.Small])
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  tipo: string;
  items;

  constructor(private breakpointObserver: BreakpointObserver,
    private router: ActivatedRoute) {
  }
  ngOnInit(): void {
    this.items = [
      { link: 'inicio', icono: 'home', nombre: 'Inicio', tipo: null },
      { link: '', icono: 'local_shipping', nombre: 'Envíos', tipo: null },
      { link: 'motorizados', icono: 'directions_bike', nombre: 'Motorizados', tipo: null },
      { link: '', icono: 'contacts', nombre: 'Clientes', tipo: null },
      { link: '', icono: 'settings', nombre: 'Configuración', tipo: null },
      { link: '', icono: 'login', nombre: 'Cerrar Sesión', tipo: null }
    ];
  }

}
