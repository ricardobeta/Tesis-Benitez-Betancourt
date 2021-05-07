import { Component, OnInit } from '@angular/core';
import { Conductor } from 'src/app/core/models/conductor.model';
import { Negocio } from 'src/app/core/models/negocio';
import { ConductorService } from 'src/app/core/services/conductor/conductor.service';
import { NegocioService } from 'src/app/core/services/negocio/negocio.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  banderaCargando = true;
  conductor: Conductor;


  constructor(private negociosService: NegocioService,
              private conductorService: ConductorService) { }

  ngOnInit(): void {
    this.negociosService.idConductor.subscribe(
      idConductor => {
        console.log(idConductor);
        this.conductorService.conseguirConductor(idConductor).subscribe(auxConductor => {
          console.log(auxConductor.payload.toJSON());
          this.conductor = auxConductor.payload.toJSON() as Conductor;
        });
        setTimeout(() => { this.banderaCargando = false;}, 800)
      }
    );
  }

}
