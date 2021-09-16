import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Cliente } from 'src/app/core/models/cliente.model';
import { MatPaginator } from '@angular/material/paginator';
import { ClienteService } from '../../../core/services/cliente/cliente.service';
import { EnvioService } from 'src/app/core/services/envios/envio.service';
import { Envio } from '../../../core/models/envio.model';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  dataSource = new MatTableDataSource<Envio>();
  displayedColumns: string[] = ['Cedula', 'Nombre', 'Direccion', 'Celular', 'Pedidos', 'Acciones'];
  listaCedulas = [];

  constructor(private enviosService: EnvioService) { }

  ngOnInit(): void {
    this.enviosService.listaEnvios().subscribe(envios => {
      this.dataSource.data = [];
      envios.forEach(envio => {
        const auxEnvio: any = envio.payload.toJSON();
        

        //this.listaCedulas.push(auxEnvio.cliente.cedula); 
        
        
        //auxConductor.$key = conductor.key;
        this.dataSource.data.push(auxEnvio as Envio);
        
      })
      this.dataSource.paginator = this.paginator;
      console.log(this.listaCedulas);

    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
