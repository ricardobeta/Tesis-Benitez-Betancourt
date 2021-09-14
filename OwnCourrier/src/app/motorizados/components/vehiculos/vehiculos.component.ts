import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Vehiculo } from 'src/app/core/models/vehiculo.model';
import { VehiculoService } from 'src/app/core/services/vehiculo/vehiculo.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogEliminarComponent } from '../../../shared/dialog-eliminar/dialog-eliminar/dialog-eliminar.component';

@Component({
  selector: 'app-vehiculos',
  templateUrl: './vehiculos.component.html',
  styleUrls: ['./vehiculos.component.scss']
})
export class VehiculosComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  dataSource = new MatTableDataSource<Vehiculo>();
  displayedColumns: string[] = ['placa', 'marca', 'color', 'responsable', 'estado', 'acciones'];
  dialogRef;
  eliminarDato;

  constructor(private vehiculoService: VehiculoService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.vehiculoService.listaVehiculos().subscribe(vehiculos => {
      this.dataSource.data = [];
      vehiculos.forEach(vehiculo => {
        const auxVehiculo: any = vehiculo.payload.toJSON();
        auxVehiculo.$key = vehiculo.key;
        this.dataSource.data.push(auxVehiculo as Vehiculo);
      })
      this.dataSource.paginator = this.paginator;
    });
  }

  eliminarVehiculo(aux) {

    // const aux =  this.dataSource.data.splice(i, 1)[0] as Producto;
     // console.log(aux);
     this.dataSource._updateChangeSubscription();
     this.vehiculoService.eliminarVehiculo(aux);
     console.log('dato no eliminado');
 
  }

  openDialog(i) {
    this.dialogRef = this.dialog.open(DialogEliminarComponent);

    this.dialogRef.afterClosed().subscribe(result => {
      this.eliminarDato = result;
      console.log(this.eliminarDato);
      if (this.eliminarDato === true) {
        this.eliminarVehiculo(i);
        console.log('dato eliminado');
      } else {
        console.log('dato no eliminado');
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }




}
