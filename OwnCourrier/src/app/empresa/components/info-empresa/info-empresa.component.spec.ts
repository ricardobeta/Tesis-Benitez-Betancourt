import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { InfoEmpresaComponent } from './info-empresa.component';

describe('InfoEmpresaComponent', () => {
  let component: InfoEmpresaComponent;
  let fixture: ComponentFixture<InfoEmpresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoEmpresaComponent ],
      imports: [
        ReactiveFormsModule
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Existe Componente', () => {
    expect(component).toBeTruthy();
  });

  it('Formulario Campos Iniciales', () => {
    expect(component.form.value).toEqual({nombreEmpresa: '', celular: '', correoAdmin: '', descripcion: '', fileLogo: null, pathLogo: '', urlLogo: ''})
  });

  it('Cargar Foto Empresa', () => {
    const foto = {
      target: {
        files: [
          'wr3wfssdsfwr34rfesdfsdr340efds0f9dsf9s0dfsd9'
        ]
      }
    }
    component.cargarFotoPerfil(foto)
    expect(component.file.value).not.toBeNull();
  });


  it('Eliminar Foto Empresa exitoso', () => {
    component.eliminarFotoPerfil()
    expect(component.file.value).toBeNull();
  });

});
