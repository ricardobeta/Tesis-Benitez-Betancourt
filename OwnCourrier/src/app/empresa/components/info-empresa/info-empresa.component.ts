import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NegocioService } from 'src/app/core/services/negocio/negocio.service';

@Component({
  selector: 'app-info-empresa',
  templateUrl: './info-empresa.component.html',
  styleUrls: ['./info-empresa.component.scss']
})
export class InfoEmpresaComponent implements OnInit {

  form: FormGroup;
  auxKey;

  constructor(private fromBuilder: FormBuilder,
              private negociosService: NegocioService) {
    this.auxKey = this.negociosService.idNegocio.value;
    this.buildForm();
  }

  ngOnInit(): void {
    this.negociosService.negocio.subscribe(
      negocio => {
        console.log(negocio);
        //this.form.patchValue(negocio);
      }
    );
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

  saveInfo() {
    if (this.form.valid) {
      console.log(this.form.value);
    }
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
