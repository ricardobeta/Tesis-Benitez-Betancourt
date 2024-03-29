import { Component, OnInit } from '@angular/core';
import { Conductor } from 'src/app/core/models/conductor.model';
import { Envio } from 'src/app/core/models/envio.model';
import { ConductorService } from 'src/app/core/services/conductor/conductor.service';
import { NegocioService } from 'src/app/core/services/negocio/negocio.service';
import { MatDialog } from '@angular/material/dialog';
import { ScannerComponent } from '../scanner/scanner.component';
import { EnvioService } from 'src/app/core/services/envios/envio.service';
import { ToastrService } from 'ngx-toastr';
import { DialogProblemasComponent } from '../dialog-problemas/dialog-problemas.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent implements OnInit {

  envios: any[] = [];
  conductor;
  encendido = false;
  //estados = ['enRuta', 'enProceso', 'entregado', 'rechazado']

  estados = [
    {
      value: 'enRuta',
      text: 'En Ruta'
    },
    {
      value: 'enProceso',
      text: 'En Proceso'
    },
    {
      value: 'entregado',
      text: 'Entregado'
    },
    {
      value: 'rechazado',
      text: 'Rechazado'
    }
  ]


  constructor(private conductorService: ConductorService,
              private negociosService: NegocioService,
              private envioService: EnvioService,
              public dialog: MatDialog,
              private toast: ToastrService,
              private route: Router,
              private activatedRoute: ActivatedRoute) { }

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

  openDialog(id: string) {
    this.route.navigate([`./scanner/${id}`], {relativeTo: this.activatedRoute})
    // const ref = this.dialog.open(ScannerComponent);
    // ref.afterClosed().subscribe(
    //   id => {
    //     if(id) {
    //       this.envioService.envioEnruta(id).then(
    //         () => this.toast.success("Envio cargado correctamente")
    //       )
    //     }
    //   }
    // )
  }


  openDialogProblemas() {
    const dialogRef = this.dialog.open(DialogProblemasComponent);
  }

  
  openURLmapa (url:string) {
    window.open(url, "_blank");
  }

  cambioEstado(key, estado) {
    this.envioService.cambioEstadoEnvio(key,estado)
  }


}
