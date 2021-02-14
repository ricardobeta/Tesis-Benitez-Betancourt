import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-info-empresa',
  templateUrl: './info-empresa.component.html',
  styleUrls: ['./info-empresa.component.scss']
})
export class InfoEmpresaComponent implements OnInit {

  form: FormGroup;

  constructor(private fromBuilder: FormBuilder) {
    this.buildForm();
  }

  ngOnInit(): void {
  }

  buildForm() {
    this.form = this.fromBuilder.group(
      {
        nombreEmpresa: ['', Validators.required],
        celular: ['', Validators.required]
      }
    );
  }

  cargarFotoConductor(event) {
    this.filefField.setValue(event.target.files[0]);
  }


  cargarFotoLicencia(event) {
    this.filelField.setValue(event.target.files[0]);
  }

  eliminarFotoConductor() {
    this.filefField.setValue(null);
  }

  eliminarLicencia() {
    this.filelField.setValue(null);
  }

  guardarConductor(event: Event) {
    event.preventDefault();
    if(this.form.valid) {
      console.log(this.form.value);
    }
  }

  get filefField(): AbstractControl {
    return this.form.get('fileF')
  }

  get filelField(): AbstractControl {
    return this.form.get('fileL')
  }

}
