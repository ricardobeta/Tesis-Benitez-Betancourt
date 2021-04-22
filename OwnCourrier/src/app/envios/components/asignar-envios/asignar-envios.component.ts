import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';

@Component({
  selector: 'asignar-envios',
  templateUrl: 'asignar-envios.component.html',
  styleUrls: ['asignar-envios.component.scss'],
})
export class AsignarEnviosComponent implements OnInit {

  @ViewChild(MatAccordion) accordion: MatAccordion;


  constructor() { }

  ngOnInit(): void {
  }

}