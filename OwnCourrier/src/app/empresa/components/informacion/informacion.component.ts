import { Component, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
// import { SnackBarComponent } from '../snack-bar/snack-bar.component';
import { NegocioService } from 'src/app/core/services/negocio/negocio.service';
import { ToastrService } from 'ngx-toastr';
// import { max_size_image } from 'src/environments/environment';
import { Negocio } from 'src/app/core/models/negocio';

@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.component.html',
  styleUrls: ['./informacion.component.scss']
})
export class InformacionComponent implements OnInit, OnDestroy {

  form: FormGroup;

  tiempo = 0;

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  palabras = [];
  auxKey;
  showIcono = false;
  banderaImagen = false;
  banderaImagenP = false;
  hideA = true;
  hideN = true;
  hideVN = true;


  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(private fromBuilder: FormBuilder,
              private snackBar: MatSnackBar,
              private negociosService: NegocioService,
              private toast: ToastrService) {
    this.buildForm();
    // this.auxKey = this.negociosService.id.value;
  }


  ngOnInit(): void {
    this.form.disable();
    // console.log('lectura', this.negociosService.negocio.value);
    this.palabras = [];
    /*this.negociosService.negocio.subscribe(
      negocio => {
        // console.log(negocio);
        for (const key in negocio.palabrasClave) {
          if (Object.prototype.hasOwnProperty.call(negocio.palabrasClave, key)) {
            const element = negocio.palabrasClave[key];
            // console.log(element);
            this.palabras.push(element);
          }
        }
        negocio.palabrasClave = [];
        this.form.patchValue(negocio);
      }
    );*/

  }


  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.palabras.push(value.trim());
    }

    if (input) {
      input.value = '';
    }
  }

  remove(fruit): void {
    const index = this.palabras.indexOf(fruit);

    if (index >= 0) {
      this.palabras.splice(index, 1);
    }
  }

  desbloquearCampos() {
    this.form.enable();
    // this.openSnackBar();
    this.showIcono = true;
  }

  buildForm() {
    this.form = this.fromBuilder.group(
      {
        nombreEmpresa: ['', Validators.required],
        tipo: ['', Validators.required],
        celular: ['', Validators.required],
        correo: ['', Validators.required],
        categoria: ['', Validators.required],
        palabrasClave: [''],
        descripcion: ['', Validators.required],
        direccion: ['', Validators.required],
        urlfacebook: [''],
        urlinsta: [''],
        urltwitter: [''],
        telefono: [''],
        quienes: [''],
        mision: [''],
        vision: [''],
        file: [''],
        path: [''],
        urlLogo: [''],
        filePortada: [''],
        pathPortada: [''],
        urlPortada: ['']
      }
    );
  }

  cargarImagen(event) {
    this.imgField.setValue(event.target.files[0]);
    this.pathField.setValue(Math.random().toString(36).substring(2));
  }

  eliminarImagen() {
    this.imgField.setValue('');
    this.pathField.setValue('');
  }

  cargarImagenPortada(event) {
    this.imgFieldPortada.setValue(event.target.files[0]);
    this.pathFieldPortada.setValue(Math.random().toString(36).substring(2));
  }

  eliminarImagenPortada() {
    this.imgFieldPortada.setValue('');
    this.pathFieldPortada.setValue('');
  }

  saveInfo() {
    // this.banderaImagenP = true;
    if (this.form.valid) {
      // if (this.imgField.value.size <= max_size_image || this.imgFieldPortada.value.size <= max_size_image) {
        console.log(this.form.value);
        const info = this.form.value as Negocio;
        // info.palabrasClave = this.palabras;
        // console.log(this.imgField.value.size);
       // if (info.file) {
         // this.banderaImagen = true;
          /*this.negociosService.modificarInfoNegocioLogo(info, this.auxKey).then(() =>
            setTimeout(() => {

              this.banderaImagen = false;
            }, 1500)
          );*/
        //}

        /*if (info.filePortada) {
          this.banderaImagenP = true;
          this.negociosService.modificarInfoNegocioPortada(info, this.auxKey).then(() =>
            setTimeout(() => {
              this.banderaImagenP = false;
            }, 1500)
          );
        }*/
        this.toast.success('Actualizando información...', 'Cambios realizados');
        this.palabras = [];
     // } else {
      //  this.toast.error('Tamaño máximo de 1MB', 'Error tamaño de imagen');

     // }

    } else if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.banderaImagen = false;
      this.banderaImagenP = false;
      this.toast.error('Campos obligatorios vacíos', 'Error');
    } else {
      console.log('Otro error');
      this.banderaImagen = false;
      this.banderaImagenP = false;

    }

  }
/*
  openSnackBar(event?: Event) {
    const aux = this.snackBar.openFromComponent(SnackBarComponent, {
      duration: 0,
    });
    aux.instance.verificado.subscribe(
      bandera => {
        if (bandera) {
          // intentar guardar
          this.saveInfo();
          aux.instance.verificado.next(false);
        }
      }
    );
  }
  */

  get imgField() {
    return this.form.get('file');
  }

  get pathField() {
    return this.form.get('path');
  }

  get urlLogoField() {
    return this.form.get('urlLogo');
  }

  get imgFieldPortada() {
    return this.form.get('filePortada');
  }

  get pathFieldPortada() {
    return this.form.get('pathPortada');
  }

  get urlPortadaField() {
    return this.form.get('urlPortada');
  }

  /*
  openSnackBar() {
    this.snackBar.openFromComponent(SnackBarComponent, {
      duration: this.tiempo * 1000,
    }).onAction().subscribe(() => {

    });
  }
  */

  cerrarSnackBar() {
    this.snackBar.dismiss();
  }

  ngOnDestroy(): void {
    this.cerrarSnackBar();
  }
}
