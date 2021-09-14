import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Conductor } from 'src/app/core/models/conductor.model';
import { ConductorService } from 'src/app/core/services/conductor/conductor.service';
import { AsignacionComponent } from '../asignacion/asignacion.component';
import { DialogEliminarComponent } from '../../../shared/dialog-eliminar/dialog-eliminar/dialog-eliminar.component';

@Component({
  selector: 'app-conductores',
  templateUrl: './conductores.component.html',
  styleUrls: ['./conductores.component.scss']
})
export class ConductoresComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  dataSource = new MatTableDataSource<Conductor>();
  displayedColumns: string[] = ['foto', 'cedula', 'nombreCompleto', 'celular', 'fecha', 'estado', 'acciones'];
  conductor: Conductor;
  dialogRef;
  eliminarDato;

  constructor(private conductorService: ConductorService, public dialog: MatDialog,
              private toast: ToastrService) { }

  ngOnInit(): void {
    this.conductorService.listaConductores().subscribe(conductores => {
      this.dataSource.data = [];
      conductores.forEach(conductor => {
        const auxConductor: any = conductor.payload.toJSON();
        auxConductor.$key = conductor.key;
        this.dataSource.data.push(auxConductor as Conductor);
      })
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  openDialogAsignacion(conductor: Conductor): void {
    const dialogRef = this.dialog.open(AsignacionComponent, {
      width: '30rem',
      data: conductor
    });

    dialogRef.afterClosed().subscribe(result => {
        if(result === 'Guardado Exitosamente') {
          this.toast.success('Se Asigno Correctamente')
        }
    });
  }

  eliminarConductor(aux) {

    //const aux =  this.dataSource.data.splice(i, 1)[0] as Conductor;
    console.log(aux);
     //this.dataSource._updateChangeSubscription();
     //this.conductorService.eliminarConductor(aux);
     //console.log('dato no eliminado');
   }

  openDialogEliminar(i: number) {
    this.dialogRef = this.dialog.open(DialogEliminarComponent);

    this.dialogRef.afterClosed().subscribe(result => {
      this.eliminarDato = result;
      console.log(this.eliminarDato);
      if (this.eliminarDato === true) {
        this.eliminarConductor(i);
        console.log('dato eliminado');
      } else {
        console.log('dato no eliminado');
      }
    });
  }
}
