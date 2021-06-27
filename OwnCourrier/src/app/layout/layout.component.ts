import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from '../core/services/login/login.service';
import { NegocioService } from '../core/services/negocio/negocio.service';

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

  bandera = false;

  constructor(private breakpointObserver: BreakpointObserver,
              ) {
      // this.router.params.subscribe(params => {
      //   negocioService.recuperarNegocioID(params.id);
      // });
      // this.negocioService.idNegocio.subscribe(
      //   idNegocio => {
      //       if(idNegocio) {
      //         this.bandera = true;
      //       }
      //   }
      // )
  }
  
  ngOnInit(): void {
    this.items = [
      { link: './', icono: 'home', nombre: 'Inicio',  },
      { link: 'envios', icono: 'local_shipping', nombre: 'Envíos'  },
      { link: 'motorizados', icono: 'delivery_dining_outlined', nombre: 'Motorizados' },
      { link: 'clientes', icono: 'contacts', nombre: 'Clientes' },
      { link: 'zonas-cobertura', icono: 'map', nombre: 'Zonas Cobertura' },
      { link: 'informacion', icono: 'settings', nombre: 'Configuración' },
      { link: '', icono: 'login', nombre: 'Cerrar Sesión', f: true }
    ];
  }

  cerrarSesion() {
    // this.loginService.logout();
  }
  nada() {
  }
}
