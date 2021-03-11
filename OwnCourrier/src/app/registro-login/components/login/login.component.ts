import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  constructor(private formBuilder: FormBuilder) {
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
        	
      } else if(rol === 'Conductor') {
        
      }
    } else {
      this.form.markAllAsTouched();
    }
  }
}
