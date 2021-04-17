import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/core/services/login/login.service';
import { DialogPasswComponent } from '../dialog-passw/dialog-passw.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup
  roles = [
    'Administrador',
    'Conductor'
  ];
  dialogRef;
  constructor(private formBuilder: FormBuilder, 
              private loginService: LoginService,
              private toastr: ToastrService,
              public dialog: MatDialog) {
    this.buildForm();
  }

  ngOnInit(): void {
  }

  buildForm() {
    this.form = this.formBuilder.group(
      {
        rol: ['', Validators.required],
        correo: ['', Validators.required],
        password: ['', Validators.required]
      }
    );
  }


  loginUsuario(event: Event) {
    event.preventDefault();
    if(this.form.valid) {
      const rol = this.form.get('rol').value;
      if (rol === 'Administrador') {
        	this.loginService.iniciarSesionAdm(this.valueCorreo, this.valuePassword)
      } else if(rol === 'Conductor') {
        
      }
    } else {
      this.form.markAllAsTouched();
      if (this.form.invalid) {
        this.toastr.error('Campos obligatorios', 'Error Iniciar sesión');
      } else {
        this.toastr.error('Correo o contraseña incorrectos', 'Error Iniciar sesión');
      } 
    }
  }

  get valueCorreo() {
    return this.form.get('correo').value
  }
  
  private get valuePassword() {
    return this.form.get('password').value
  }

  openDialogContrasena() {
    this.dialogRef = this.dialog.open(DialogPasswComponent);
    this.dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
