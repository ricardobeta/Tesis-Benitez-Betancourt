import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { RegistroAdministradorComponent } from './registro-administrador.component';

describe('RegistroAdministradorComponent', () => {
  let component: RegistroAdministradorComponent;
  let fixture: ComponentFixture<RegistroAdministradorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroAdministradorComponent ],
      imports: [
        ReactiveFormsModule
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroAdministradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Existe Componente', () => {
    expect(component).toBeTruthy();
  });

  it('Formulario Campos Iniciales', () => {
    expect(component.form.value).toEqual({correoAdmin: '', password: '', verificarPass: ''})
  });

});
