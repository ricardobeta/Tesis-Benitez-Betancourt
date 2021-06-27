import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CrearVehiculoComponent } from './crear-vehiculo.component';

describe('CrearVehiculoComponent', () => {
  let component: CrearVehiculoComponent;
  let fixture: ComponentFixture<CrearVehiculoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearVehiculoComponent ],
      imports: [
        ReactiveFormsModule
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearVehiculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Existe Componente', () => {
    expect(component).toBeTruthy();
  });

  it('Formulario Campos Iniciales', () => {
    expect(component.form.value).toEqual({marca: '', placa: '', color: '', fileM: null, pathMatricula: '', estado: 'disponible', asignado: false})
  });

  it('Cargar Foto Matricula', () => {
    const foto = {
      target: {
        files: [
          'wr3wfssdsfwr34rfesdfsdr340efds0f9dsf9s0dfsd9'
        ]
      }
    }
    component.cargarFotoMatricula(foto)
    expect(component.fileMField.value).not.toBeNull();
    expect(component.form.get('pathMatricula').valid).not.toBeFalse()
  });


});
