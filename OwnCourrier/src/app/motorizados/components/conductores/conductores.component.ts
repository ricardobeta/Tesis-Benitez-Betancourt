import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Conductor } from 'src/app/core/models/conductor.model';
import { ConductorService } from 'src/app/core/services/conductor/conductor.service';

@Component({
  selector: 'app-conductores',
  templateUrl: './conductores.component.html',
  styleUrls: ['./conductores.component.scss']
})
export class ConductoresComponent implements OnInit {

  dataSource = new MatTableDataSource<Conductor>();
  displayedColumns: string[] = ['ID', 'cedula', 'nombreCompleto', 'celular', 'fecha', 'estado', 'acciones'];

  constructor(private conductorService: ConductorService) { }

  ngOnInit(): void {
    this.conductorService.listaConductores().subscribe(conductor => {
      console.log(conductor);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
