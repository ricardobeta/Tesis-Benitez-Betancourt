import { Component, OnInit, ViewChild } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Envio } from 'src/app/core/models/envio.model';
import { EnvioService } from 'src/app/core/services/envios/envio.service';
import { GuiaComponent } from '../guia/guia.component';
import { InfoEnvioComponent } from '../info-envio/info-envio.component';
import { DialogEliminarComponent } from '../../../shared/dialog-eliminar/dialog-eliminar/dialog-eliminar.component';

interface EnviosTable {
  Cedula: string
  Nombre_cliente: string
  Celular: string
  Dir_url: string
  Fecha: string
  Estado: string
}

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  dataSource = new MatTableDataSource<EnviosTable>();
  displayedColumns: string[] = ['Cedula', 'Nombre_cliente', 'Celular', 'Dir_url', 'Fecha', 'Estado', 'Acciones'];
  dialogRef;
  eliminarDato;

  constructor(private envioService: EnvioService, 
              public dialog: MatDialog,
              private bottomSheet: MatBottomSheet) { }

  ngOnInit(): void {
    this.envioService.listaEnvios().subscribe(envios => {
      this.dataSource.data = envios.reverse().map(envio => {
        const auxEnvio = envio.payload.toJSON() as Envio;
        return {
          Cedula: auxEnvio.cliente.cedula,
          Nombre_cliente: auxEnvio.cliente.nombreCompleto,
          Celular: auxEnvio.cliente.celular,
          Dir_url: auxEnvio.direccion.descripcion,
          Fecha: auxEnvio.fecha,
          Estado: auxEnvio.estado
        } as EnviosTable
      })
      this.dataSource.paginator = this.paginator;
    });
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

  eliminarEnvio(aux) {

    // const aux =  this.dataSource.data.splice(i, 1)[0] as Producto;
     // console.log(aux);
     this.dataSource._updateChangeSubscription();
     this.envioService.eliminarEnvio(aux);
    
  }

  openDialog(i) {
    this.dialogRef = this.dialog.open(DialogEliminarComponent);

    this.dialogRef.afterClosed().subscribe(result => {
      this.eliminarDato = result;
      console.log(this.eliminarDato);
      if (this.eliminarDato === true) {
        this.eliminarEnvio(i);
        console.log('dato eliminado');
        this.dataSource._updateChangeSubscription();
      } else {
        console.log('dato no eliminado');
      }
    });
  }

}
