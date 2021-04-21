import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { ZonaCobertura } from 'src/app/core/models/zona-cobertura.model';
import { NegocioService } from 'src/app/core/services/negocio/negocio.service';

@Component({
  selector: 'app-form-zona',
  templateUrl: './form-zona.component.html',
  styleUrls: ['./form-zona.component.scss']
})
export class FormZonaComponent implements OnInit {

  tipo = '';
  form: FormGroup;


  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: any, private fb: FormBuilder,
  private negociosService: NegocioService, private bottomSheetRef: MatBottomSheetRef<FormZonaComponent>) {
    this.buildForm();
    this.tipo = data.tipo;
    console.log(this.tipo)
  }

  ngOnInit(): void {
    this.form.patchValue(this.data.zona);
  }

  buildForm() {
    this.form = this.fb.group({
      nombre: ['', [Validators.required]],
      color: ['', [Validators.required]],
      vertices: ['', [Validators.required]],
      $key: ['']
    });
  }

  saveForm() {
    if(this.form.valid) {
      const zona: ZonaCobertura = this.form.value;
      if(this.tipo === 'guardar') {
        delete zona.$key
        this.negociosService.agregarZona(zona).then(
          value => {
            this.bottomSheetRef.dismiss('guardado')
          }
        )
      } else if(this.tipo === 'modificar') {
        this.negociosService.modificarZona(zona, zona.$key).then(
          value => {
            this.bottomSheetRef.dismiss('modificado')
          }
        )
      }
    }
  }

  eliminar() {
    this.negociosService.eliminarZonaCobertura(this.data.zona.$key).then(
      value => {
        this.bottomSheetRef.dismiss('eliminado')
      }
    )
  }

  cancelar() {
    this.bottomSheetRef.dismiss('cancelado')
  }
}
