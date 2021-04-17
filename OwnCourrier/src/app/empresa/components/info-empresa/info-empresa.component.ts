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

  constructor(private formBuilder: FormBuilder,
              private negociosService: NegocioService) {
    this.buildForm();
    this.auxKey = this.negociosService.idNegocio.value;
  }

  ngOnInit(): void {
    this.negociosService.negocio.subscribe(
      negocio => {
        console.log(negocio);
        // if (negocio !== undefined || negocio !== null) {
        //   this.form.patchValue(negocio);
        // }
      }
    );
    console.log(this.auxKey);
  }

  buildForm() {
    this.form = this.formBuilder.group(
      {
        nombreEmpresa: ['', Validators.required],
        celular: ['', Validators.required],
        correoAdmin: ['', Validators.required],
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
