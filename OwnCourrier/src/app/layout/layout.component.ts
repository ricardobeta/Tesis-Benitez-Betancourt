import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from '../core/services/login/login.service';

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
    private router: ActivatedRoute,
    private loginService: LoginService) {
  }
  ngOnInit(): void {
    this.items = [
      { link: './', icono: 'home', nombre: 'Inicio',  },
      { link: 'envios', icono: 'local_shipping', nombre: 'Envíos'  },
      { link: 'motorizados', icono: 'directions_bike', nombre: 'Motorizados' },
      { link: 'clientes', icono: 'contacts', nombre: 'Clientes' },
      { link: 'informacion', icono: 'settings', nombre: 'Configuración' },
      { link: '', icono: 'login', nombre: 'Cerrar Sesión', f: true }
    ];
  }

  cerrarSesion() {
    this.loginService.logout();
  }
  nada() {
  }
}
