import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
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
              private negociosService: NegocioService,
              private toastr: ToastrService) {
    this.buildForm();
    this.auxKey = this.negociosService.idNegocio.value;
  }

  ngOnInit(): void {
    this.negociosService.negocio.subscribe(
      negocio => {
        console.log(negocio);
        // if (negocio !== undefined || negocio !== null) {
          this.form.patchValue(negocio);
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
        descripcion: [''],
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
      const auxNegocio = this.form.value;
      console.log(auxNegocio);
      this.negociosService.modificarInfoNegocio(auxNegocio, this.auxKey);
      this.toastr.success('Actualizada correctamente', 'Información de la empresa', );
    } else {
      if (this.file.value === null) {
        this.toastr.error('No se ha subido ninguna imagen para el logo', 'Error');
      } else {
        this.toastr.error('Campos obligatorios vacíos', 'Error');
      }
    }
  }

  get file(): AbstractControl {
    return this.form.get('fileLogo')
  }

  get urlLogo(): AbstractControl {
    return this.form.get('urlLogo')
  }

}
