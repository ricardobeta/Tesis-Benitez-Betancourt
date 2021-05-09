import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Conductor } from 'src/app/core/models/conductor.model';
import { Envio } from 'src/app/core/models/envio.model';
import { ConductorService } from 'src/app/core/services/conductor/conductor.service';
import { NegocioService } from 'src/app/core/services/negocio/negocio.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent implements OnInit {

  envios: any[] = [];
  conductor;

  constructor(private conductorService: ConductorService,
              private negociosService: NegocioService) { }

  ngOnInit(): void {
    this.negociosService.idConductor.subscribe(idConductor => {
        this.conductorService.conseguirConductor(idConductor).subscribe(auxConductor => {
          this.conductor = auxConductor.payload.toJSON() as Conductor;
          this.envios = [];
          this.conductorService.conseguirEnviosXConductor(this.conductor).subscribe(envios => {
            envios.forEach(envio => {
              const auxEnvio = envio.payload.toJSON() as Envio;
              auxEnvio.$key = envio.key;
              this.envios.push(auxEnvio);
            });
          });
        });
        console.log(this.envios);
      }
    );

  }


}
