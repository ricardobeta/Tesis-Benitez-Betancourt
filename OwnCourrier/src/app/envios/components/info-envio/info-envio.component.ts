import { Component, Inject, OnInit } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { Envio } from 'src/app/core/models/envio.model';

@Component({
  selector: 'app-info-envio',
  templateUrl: './info-envio.component.html',
  styleUrls: ['./info-envio.component.scss']
})
export class InfoEnvioComponent implements OnInit {

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: { envio: Envio }) { }

  ngOnInit(): void {

  }

}
