import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Envio } from 'src/app/core/models/envio.model';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent implements OnInit {

  dataSource = new MatTableDataSource<Envio>();
  displayedColumns: string[] = ['Nombre_cliente', 'Cedula', 'Celular', 'Dir_url', 'Fecha', 'Estado', 'Acciones'];

  constructor() { }

  ngOnInit(): void {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
