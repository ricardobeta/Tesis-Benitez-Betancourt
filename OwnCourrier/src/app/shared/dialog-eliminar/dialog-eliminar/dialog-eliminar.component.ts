import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-eliminar',
  templateUrl: './dialog-eliminar.component.html',
  styleUrls: ['./dialog-eliminar.component.scss']
})
export class DialogEliminarComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogEliminarComponent>,
              @Inject(MAT_DIALOG_DATA) public data: boolean) { }

  ngOnInit(): void {
  }

}
