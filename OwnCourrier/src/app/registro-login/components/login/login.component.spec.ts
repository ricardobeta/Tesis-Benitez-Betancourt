import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/core/services/login/login.service';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {

    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
  
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [ LoginComponent ],
        imports: [
          ReactiveFormsModule
        ],
      })
      .compileComponents().then( () => {
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
      });
    });
  
    it('Existe Componente', () => {
      expect(component).toBeTruthy();
    });
  
    it('Formulario Campos Iniciales', () => {
      expect(component.form.value).toEqual({rol: '', correo: '', password: ''})
    });
  

    it('Correo Formato Incorrecto', () => {
        component.form.get('correo').setValue('acom.@_com@')
        console.log(component.form.get('correo').value)
        expect(component.form.get('correo').valid).toBeFalsy();
      });

});
