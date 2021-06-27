import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { CrearConductorComponent } from './crear-conductor.component';

describe('CrearConductorComponent', () => {
  let component: CrearConductorComponent;
  let fixture: ComponentFixture<CrearConductorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearConductorComponent ],
      imports: [
        ReactiveFormsModule
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearConductorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Existe Componente', () => {
    expect(component).toBeTruthy();
  });

  it('Formulario Campos Iniciales', () => {
    expect(component.form.value).toEqual({cedula: '', celular: '', correo: '', direccion: '', fechaNacimiento: '', estado: 'disponible', nombreCompleto: '', fileF: null, fileL: null})
  });

  it('Cargar Foto Conductor', () => {
    const foto = {
      target: {
        files: [
          'wr3wfssdsfwr34rfesdfsdr340efds0f9dsf9s0dfsd9'
        ]
      }
    }
    component.cargarFotoConductor(foto)
    expect(component.filefField.value).not.toBeNull();
  });


  it('Cargar Foto Licencia', () => {
    const foto = {
      target: {
        files: [
          'wr3wfssdsfwr34rfesdfsdr340efds0f9dsf9s0dfsd9'
        ]
      }
    }
    component.cargarFotoLicencia(foto)
    expect(component.filelField.value).not.toBeNull();
  });

  it('Cedula Conductor Valida', ()=>{
    const cedula = '1726079625';
    component.form.get('cedula').setValue(cedula);
    expect(component.form.get('cedula').valid).toBeTrue();
  })

  it('Cedula Conductor Formato Invalido', ()=>{
    const cedula = '1726079699';
    component.form.get('cedula').setValue(cedula);
    expect(component.form.get('cedula').valid).toBeFalse();
  })

  it('Correo Formato Incorrecto', () => {
    component.form.get('correo').setValue('acom.@_com@')
    console.log(component.form.get('correo').value)
    expect(component.form.get('correo').valid).toBeFalsy();
  });

  it('Correo Formato Correcto', () => {
    component.form.get('correo').setValue('ricardo@gmail.com')
    console.log(component.form.get('correo').value)
    expect(component.form.get('correo').valid).toBeTruthy();
  });

});
