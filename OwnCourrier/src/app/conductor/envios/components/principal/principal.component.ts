import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Conductor } from 'src/app/core/models/conductor.model';
import { Envio } from 'src/app/core/models/envio.model';
import { ConductorService } from 'src/app/core/services/conductor/conductor.service';
import { NegocioService } from 'src/app/core/services/negocio/negocio.service';
import { ViewChild } from '@angular/core';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { MatDialog } from '@angular/material/dialog';
import { ScannerComponent } from '../scanner/scanner.component';
import { EnvioService } from 'src/app/core/services/envios/envio.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent implements OnInit {

  envios: any[] = [];
  conductor;
  encendido = false;


  constructor(private conductorService: ConductorService,
              private negociosService: NegocioService,
              private envioService: EnvioService,
              public dialog: MatDialog,
              private toast: ToastrService) { }

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

  openDialog() {
    const ref = this.dialog.open(ScannerComponent);
    ref.afterClosed().subscribe(
      id => {
        if(id) {
          this.envioService.envioEnruta(id).then(
            () => this.toast.success("Envio cargado correctamente")
          )
        }
      }
    )
  }

  


}
