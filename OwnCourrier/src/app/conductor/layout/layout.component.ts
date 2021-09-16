import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { ConductorService } from 'src/app/core/services/conductor/conductor.service';
import { NegocioService } from 'src/app/core/services/negocio/negocio.service';

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
    private router: ActivatedRoute, private conductorService: ConductorService,
    private negocioService: NegocioService) {
      this.router.params.subscribe(params => {
        console.log(params.id)
        this.conductorService.recuperarConductorID(params.id);
      });
      this.negocioService.idNegocio.subscribe(
        idNegocio => {
            if(idNegocio) {
              this.bandera = true;
            }
        }
      )

    }

  ngOnInit(): void {
    this.items = [
      { link: 'inicio', icono: 'home', nombre: 'Inicio', tipo: null },
      { link: 'envios', icono: 'local_shipping', nombre: 'Envíos', tipo: null },
      { link: '', icono: 'login', nombre: 'Cerrar Sesión', tipo: null }
    ];
  }

}
