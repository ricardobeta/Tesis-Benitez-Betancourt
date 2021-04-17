import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { DialogPasswComponent } from 'src/app/shared/dialog-passw/dialog-passw.component';


@Component({
  selector: 'app-info-sesion',
  templateUrl: './info-sesion.component.html',
  styleUrls: ['./info-sesion.component.scss']
})
export class InfoSesionComponent implements OnInit {

  form: FormGroup;
  dialogRef;

  constructor(private toastr: ToastrService,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  openDialogContrasena() {
    this.dialogRef = this.dialog.open(DialogPasswComponent);
    this.dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
