import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Envio } from 'src/app/core/models/envio.model';
import { EnvioService } from 'src/app/core/services/envios/envio.service';
import { GuiaComponent } from '../guia/guia.component';
import { InfoEnvioComponent } from '../info-envio/info-envio.component';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent implements OnInit {

  dataSource = new MatTableDataSource<Envio>();
  displayedColumns: string[] = ['Cedula', 'Nombre_cliente', 'Celular', 'Dir_url', 'Fecha', 'Estado', 'Acciones'];

  constructor(private envioService: EnvioService, 
              public dialog: MatDialog,
              private bottomSheet: MatBottomSheet) { }

  ngOnInit(): void {
    this.envioService.listaEnvios().subscribe(
      enviosDB => {
        enviosDB.forEach(
          envioAux => {
            const envio:any = envioAux.payload.toJSON();
            envio.$key = envioAux.key;
            this.dataSource.data.push(envio);
            this.dataSource._updateChangeSubscription()
          }
        );
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  abrirGuia(envio: Envio) {
    const dialogRef = this.dialog.open(GuiaComponent, {
      width: 'auto',
      data: envio
    });
  }

  openBottomSheet(envioRecibido): void {
    const bottomSheetRef = this.bottomSheet.open(InfoEnvioComponent, {
      data: { envio: envioRecibido },
    });
  }

}
