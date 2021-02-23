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
        celular: ['', Validators.required],
        correo: ['', Validators.required],
        descripcion: ['', Validators.required],
        fileLogo: [null, [Validators.required]],
        pathLogo: [''],
        urlLogo: ['']
      }
    );
  }


  cargarFotoPerfil(event) {
    this.file.setValue(event.target.files[0]);
  }

  eliminarFotoPerfil() {
    this.file.setValue(null);
  }

  guardar(event: Event) {
    event.preventDefault();
    if(this.form.valid) {
      console.log(this.form.value);
    }
  }

  get file(): AbstractControl {
    return this.form.get('fileLogo')
  }

}
