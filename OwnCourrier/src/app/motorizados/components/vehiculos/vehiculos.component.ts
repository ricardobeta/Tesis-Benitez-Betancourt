import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Vehiculo } from 'src/app/core/models/vehiculo.model';
import { VehiculoService } from 'src/app/core/services/vehiculo/vehiculo.service';

@Component({
  selector: 'app-vehiculos',
  templateUrl: './vehiculos.component.html',
  styleUrls: ['./vehiculos.component.scss']
})
export class VehiculosComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  dataSource = new MatTableDataSource<Vehiculo>();
  displayedColumns: string[] = ['placa', 'marca', 'color', 'responsable', 'estado', 'acciones'];

  constructor(private vehiculoService: VehiculoService) { }

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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


}
