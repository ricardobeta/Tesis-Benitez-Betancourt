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
  constructor(public dialogRef: MatDialogRef<ScannerComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    console.log(this.data.escanear);
  }

  onNoClick(): void {
    this.data.escanear = false;
    this.dialogRef.close();
    
    // setTimeout(() => { 
    //   this.dialogRef.close();
    // }, 500)
  }

  scanSuccessHandler(event) {
    this.id = event
    this.data.escanear = false;
  }



}
