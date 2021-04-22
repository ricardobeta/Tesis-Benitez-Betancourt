import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { Subscription } from 'rxjs';
import { Conductor } from 'src/app/core/models/conductor.model';
import { Envio } from 'src/app/core/models/envio.model';
import { ZonaCobertura } from 'src/app/core/models/zona-cobertura.model';
import { ConductorService } from 'src/app/core/services/conductor/conductor.service';
import { EnvioService } from 'src/app/core/services/envios/envio.service';
import { NegocioService } from 'src/app/core/services/negocio/negocio.service';

@Component({
  selector: 'asignar-envios',
  templateUrl: 'asignar-envios.component.html',
  styleUrls: ['asignar-envios.component.scss'],
})
export class AsignarEnviosComponent implements OnInit, OnDestroy {

  @ViewChild(MatAccordion) accordion: MatAccordion;
  zonas: ZonaCobertura[] = []
  conductoresDisponibles: Conductor[] = []
  envios: Envio[] = []

  $subC: Subscription;
  $subF: Subscription;
  $subZ: Subscription;
  constructor(private negocioService:NegocioService, private conductorService: ConductorService, private envioService: EnvioService) { }


  ngOnInit(): void {
    this.conseguirConductoresDisponibles();
    this.conseguirZonas();
  }

  conseguirConductoresDisponibles() {
    this.$subC = this.conductorService.listaConductores().subscribe(
      conductoresDB => {
        this.conductoresDisponibles = conductoresDB.map(
          conductorDB => {
            const conductor  = conductorDB.payload.toJSON() as Conductor;
            conductor.$key = conductorDB.key;
            return conductor
          }
        ).filter( conductor => conductor.estado === 'disponible' && conductor.keyVehiculo!== '' && conductor.keyZona !== '' );
        console.log(this.conductoresDisponibles);
      }
    );
  }


  conseguirEnvios(fecha: string) {
    this.envioService.enviosFecha(fecha).subscribe(
      enviosDB => {
        this.envios = enviosDB.map(
          envioDB => {
            const envio = envioDB.payload.toJSON() as Envio;
            envio.$key = envioDB.key;
            return envio
          }
        );
        console.log(this.envios)
      }
    )
  }

  conseguirZonas() {
    this.$subZ = this.negocioService.listaZonasCobertura().subscribe(
      zonasDB => {
        this.zonas = zonasDB.map(
          zonaDB => {
            const zona = zonaDB.payload.toJSON() as ZonaCobertura;
            zona.$key = zonaDB.key;
            return zona;
          }
        )
      }
    )
  }


  ngOnDestroy(): void {
    this.$subC.unsubscribe();
    this.$subZ.unsubscribe();
    if(this.$subF) {
      this.$subF.unsubscribe();
    }
  }

}