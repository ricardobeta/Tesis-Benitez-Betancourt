import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialog-problemas',
  templateUrl: './dialog-problemas.component.html',
  styleUrls: ['./dialog-problemas.component.scss']
})
export class DialogProblemasComponent implements OnInit {

  problems: string[] = [
    'Producto dañado o incompleto', 
    'Producto sobrepasa el máximo de peso',
    'Rechazo del cliente o insatisfecho', 
    'Ubicación incorrecta',
    'No hubo respuesta del cliente',
    'Otro...'
  ];


  constructor() { }

  ngOnInit(): void {
  }

}
