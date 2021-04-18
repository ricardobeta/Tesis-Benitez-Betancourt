import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Vehiculo } from 'src/app/core/models/vehiculo.model';

@Component({
  selector: 'app-vehiculos',
  templateUrl: './vehiculos.component.html',
  styleUrls: ['./vehiculos.component.scss']
})
export class VehiculosComponent implements OnInit {

  dataSource = new MatTableDataSource<Vehiculo>();
  displayedColumns: string[] = ['ID', 'placa', 'marca', 'color', 'responsable', 'estado', 'acciones'];

  constructor() { }

  ngOnInit(): void {
  }

}
