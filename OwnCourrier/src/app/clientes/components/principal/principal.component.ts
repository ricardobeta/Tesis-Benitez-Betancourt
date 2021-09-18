import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Cliente } from 'src/app/core/models/cliente.model';
import { MatPaginator } from '@angular/material/paginator';
import { ClienteService } from '../../../core/services/cliente/cliente.service';
import { EnvioService } from 'src/app/core/services/envios/envio.service';
import { Envio } from '../../../core/models/envio.model';

interface ClientTable {
  Cedula: string
  Nombre: string
  Direccion: string
  Celular: string
  Pedidos: string
}



@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})

export class PrincipalComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource = new MatTableDataSource<ClientTable>();
  displayedColumns: string[] = ['Cedula', 'Nombre', 'Direccion', 'Celular', 'Acciones'];
  listaCedulas = [];

  constructor(private enviosService: EnvioService) { }

  ngOnInit(): void {
    this.enviosService.listaEnvios().subscribe(envios => {
      this.dataSource.data = envios.reverse().map(
        envio => {
          const auxEnvio = envio.payload.toJSON() as Envio;
          // recuperar #pedidos por cliente
          return {
            Cedula: auxEnvio.cliente.cedula,
            Celular: auxEnvio.cliente.celular,
            Direccion: auxEnvio.direccion.descripcion,
            Nombre: auxEnvio.cliente.nombreCompleto
          } as ClientTable
        }
      ).reduce((acc: ClientTable[], item) => {

        const aux = acc.some(
          item2 => item.Cedula === item2.Cedula
        )
        if (!aux) acc.push(item)
        return acc;
      }, [])

      this.dataSource.paginator = this.paginator;

    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
