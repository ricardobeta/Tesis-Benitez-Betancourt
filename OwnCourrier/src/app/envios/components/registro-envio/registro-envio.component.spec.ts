import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MapaComponent } from 'src/app/shared/mapa/mapa.component';

import { RegistroEnvioComponent } from './registro-envio.component';

describe('RegistroEnvioComponent', () => {
  let component: RegistroEnvioComponent;
  let fixture: ComponentFixture<RegistroEnvioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroEnvioComponent, MapaComponent ],
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroEnvioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Existe Componente', () => {
    expect(component).toBeTruthy();
  });

  it('Formulario Cliente campos iniciales', () => {
    expect(component.formCliente.value).toEqual({nombreCompleto: '', cedula: '', correo: '', telefonoD: '', celular: ''});
  });

  it('Formulario Direccion campos iniciales', () => {
    expect(component.formDireccion.value).toEqual({descripcion: '', longitud: '', latitud: '', urlMapa: '', zoom: ''});
  });

  it('Formulario InfoEnvio campos iniciales', () => {
    expect(component.formInfoEnvio.value).toEqual({descripcion: '', tipo: '', prioridad: '', peso: 0});
  });

  it('Formulario Fecha campos iniciales', () => {
    expect(component.formFecha.value).toEqual({fecha: ''});
  });

  
  it('Cedula Cliente Valida', ()=>{
    const cedula = '1726079625';
    component.formCliente.get('cedula').setValue(cedula);
    expect(component.formCliente.get('cedula').valid).toBeTrue();
  })

  it('Cedula Cliente Formato Invalido', ()=>{
    const cedula = '1726079699';
    component.formCliente.get('cedula').setValue(cedula);
    expect(component.formCliente.get('cedula').valid).toBeFalse();
  })

  it('Correo Formato Incorrecto', () => {
    component.formCliente.get('correo').setValue('acom.@_com@')
    console.log(component.formCliente.get('correo').value)
    expect(component.formCliente.get('correo').valid).toBeFalsy();
  });

  it('Correo Formato Correcto', () => {
    component.formCliente.get('correo').setValue('ricardo@gmail.com')
    console.log(component.formCliente.get('correo').value)
    expect(component.formCliente.get('correo').valid).toBeTruthy();
  });

});
