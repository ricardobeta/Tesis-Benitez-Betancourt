import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { async } from 'rxjs';
import { RegistroService } from 'src/app/core/services/registro/registro.service';
import { RegistroLoginModule } from '../../registro-login.module';

import { RegistroComponent } from './registro.component';



describe('RegistroComponent', () => {
  let component: RegistroComponent;
  let fixture: ComponentFixture<RegistroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroComponent ],
      imports: [
        ReactiveFormsModule
      ],
    })
    .compileComponents().then( () => {
      fixture = TestBed.createComponent(RegistroComponent);
      component = fixture.componentInstance;
    });
  });

  it('Existe Componente', () => {
    expect(component).toBeTruthy();
  });

  it('Formulario Campos Iniciales', () => {
    expect(component.form.value).toEqual({nombreEmpresa: '', celular: '', captcha: false})
  });

  it('Validar Captcha true', () => {
    const captchaField = component.form.get('captcha');
    captchaField.setValue(true);
    expect(captchaField.valid).toBeTruthy();
  });

});

