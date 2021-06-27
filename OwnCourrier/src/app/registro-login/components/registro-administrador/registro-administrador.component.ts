import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistroNegocio } from 'src/app/core/models/registro.model';
import { NegocioService } from 'src/app/core/services/negocio/negocio.service';
import { RegistroService } from 'src/app/core/services/registro/registro.service';

@Component({
  selector: 'app-registro-administrador',
  templateUrl: './registro-administrador.component.html',
  styleUrls: ['./registro-administrador.component.scss']
})
export class RegistroAdministradorComponent implements OnInit {
  form: FormGroup;
  registroN: RegistroNegocio;
  nocoincide: boolean = false;
  constructor(private formBuilder: FormBuilder,
) {
                this.buildForm();
              }

  ngOnInit(): void {
    //this.registroN = this.registroService.negocio.value;
  }

  buildForm() {
    this.form = this.formBuilder.group(
      {
        correoAdmin: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        verificarPass: ['', [Validators.required]]
      }
    );
  }

  // registrarEmpresaFinal(event: Event) {
  //   event.preventDefault();
  //   if(this.passwordField.value === this.verificarpasswordField.value) {
  //     if(this.form.valid) {
  //       this.registroService.registroAdmin(this.correoAdminField.value, this.passwordField.value)
  //         .then(
  //           usuarioAdmin => {
  //             this.registroN.correoAdmin = this.correoAdminField.value;
  //             this.registroN.uidAdmin = usuarioAdmin.user.uid;
  //             this.registroService.registrarNegocio(this.registroN)
  //               .then(
  //                 negocio => {
  //                   this.registroN.$key = negocio.key;
  //                   this.negocioService.idNegocio.next(this.registroN.$key);
  //                   this.router.navigate(['/empresa',this.registroN.$key]);
  //                 }
  //               );
  //           }
  //         );
  //     } else {
  //       this.form.markAsDirty();
  //     }
  //   } else {
  //     this.nocoincide = true;
  //   }
  // }

  get passwordField() {
    return this.form.get('password');
  }

  get verificarpasswordField() {
    return this.form.get('verificarPass');
  }

  get correoAdminField() {
    return this.form.get('correoAdmin');
  }
}
