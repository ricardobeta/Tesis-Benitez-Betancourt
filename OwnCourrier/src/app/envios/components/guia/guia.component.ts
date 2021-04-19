import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Envio } from 'src/app/core/models/envio.model';

@Component({
  selector: 'app-guia',
  templateUrl: './guia.component.html',
  styleUrls: ['./guia.component.scss']
})
export class GuiaComponent implements OnInit {

  constructor(    public dialogRef: MatDialogRef<GuiaComponent>,
    @Inject(MAT_DIALOG_DATA) public envio: Envio) { }

  ngOnInit(): void {
  }

}
