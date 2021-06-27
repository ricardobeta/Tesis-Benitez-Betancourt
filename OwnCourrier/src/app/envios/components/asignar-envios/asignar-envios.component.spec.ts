import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Cliente } from 'src/app/core/models/cliente.model';
import { Envio } from 'src/app/core/models/envio.model';
import { ZonaCobertura } from 'src/app/core/models/zona-cobertura.model';
import { AsignarEnviosComponent } from './asignar-envios.component';

describe('AsignarEnviosComponent', () => {
  let component: AsignarEnviosComponent;
  let fixture: ComponentFixture<AsignarEnviosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsignarEnviosComponent ],
      imports: [
        ReactiveFormsModule
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignarEnviosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Existe Componente', () => {
    expect(component).toBeTruthy();
  });

  it('Formulario Campos Iniciales', () => {
    expect(component.form.value).toEqual({maxEnvios:'', maxPeso: '', fecha: ''})
  });

  it('Envio Fuera de la zona de Cobertura', () => {
    const cliente: Cliente = {cedula: '1726079625', celular: '0999249966', correo: 'r@gmail.com', nombreCompleto: 'Ricardo Betancourt'};
    const envio: Envio = {cliente: cliente,direccion: {descripcion: 'Lejano Oeste',latitud: -0.04925, longitud: -78.450272, zoom: 10, urlMapa: ''}, estado: '' , fecha: '' , infoEnvio:{descripcion: '', peso: 1, prioridad: '', tipo: ''}};
    const zona: ZonaCobertura = {color: '', nombre: '', vertices: '[{\"lat\":-0.060167301563841875,\"lng\":-78.49389541488794},{\"lat\":-0.08488651984914598,\"lng\":-78.39222187933419},{\"lat\":-0.22084181462436792,\"lng\":-78.430692946841},{\"lat\":-0.18238990497278565,\"lng\":-78.5309925156981}]'}
    const dentroDeLaZona = component.comprobarEnvioEnZona(envio, zona);
    expect(dentroDeLaZona).toBeFalse()
  })

  it('Envio Dentro de la zona de Cobertura', () => {
    const cliente: Cliente = {cedula: '1726079625', celular: '0999249966', correo: 'r@gmail.com', nombreCompleto: 'Ricardo Betancourt'};
    const envio: Envio = {cliente: cliente,direccion: {descripcion: 'Lejano Oeste',latitud: -0.060167301563841875, longitud: -78.49389541488794, zoom: 10, urlMapa: ''}, estado: '' , fecha: '' , infoEnvio:{descripcion: '', peso: 1, prioridad: '', tipo: ''}};
    const zona: ZonaCobertura = {color: '', nombre: '', vertices: '[{\"lat\":-0.060167301563841875,\"lng\":-78.49389541488794},{\"lat\":-0.08488651984914598,\"lng\":-78.39222187933419},{\"lat\":-0.22084181462436792,\"lng\":-78.430692946841},{\"lat\":-0.18238990497278565,\"lng\":-78.5309925156981}]'}
    const dentroDeLaZona = component.comprobarEnvioEnZona(envio, zona);
    expect(dentroDeLaZona).toBeFalse()
  })

});
