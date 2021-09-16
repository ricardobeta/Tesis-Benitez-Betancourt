import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { MatAccordion } from '@angular/material/expansion';
import { ToastrService } from 'ngx-toastr';
import { mergeMapTo } from 'rxjs/operators';
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

  @ViewChild(MatAccordion) accordion: MatAccordion;

  banderaCargando = true;
  conductor: Conductor;
  totalEnviospendientes = 0;
  totalEnviosRealizados = 0;


  constructor(private negociosService: NegocioService,
              private conductorService: ConductorService,
              private toast: ToastrService,
              
              ) {

              }

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

  requestPermission() {
    this.negociosService.registrarToken();
  }
}
