import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.scss']
})
export class ScannerComponent implements OnInit, OnDestroy {

  @ViewChild('scanner', { static: false })
  scanner: ZXingScannerComponent;
  devices = []
  desiredDevice;
  id = ''
  escanear = true;
  constructor(public dialogRef: MatDialogRef<ScannerComponent>) { }
  ngOnDestroy(): void {
    this.scanner = undefined
  }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.escanear = false;
    this.dialogRef.close();
  }

  scanSuccessHandler(event) {
    this.id = event
    this.escanear = false;
    this.dialogRef.close(this.id);
  }



}
