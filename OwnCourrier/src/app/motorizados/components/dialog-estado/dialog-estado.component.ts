import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialog-estado',
  templateUrl: './dialog-estado.component.html',
  styleUrls: ['./dialog-estado.component.scss']
})
export class DialogEstadoComponent implements OnInit {

  estados: any[] = [
    {
      title: 'Disponible',
      color: 'green',
      value: 'disponible'
    },
    {
      title: 'Reparación',
      color: 'orange',
      value: 'reparacion'
    },
    {
      title: 'Ocupado',
      color: 'red',
      value: 'ocupado'
    },

  ];

  constructor() { }

  ngOnInit(): void {
  }

}
