import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDividerModule } from '@angular/material/divider';
import { VehiculoService } from 'src/app/core/services/vehiculo/vehiculo.service';

import { VehiculosComponent } from './vehiculos.component';

describe('VehiculosComponent', () => {
  let component: VehiculosComponent;
  let fixture: ComponentFixture<VehiculosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehiculosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehiculosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Renderizar Headers Tabla', () => {
    const headers = ['placa', 'marca', 'color', 'responsable', 'estado', 'acciones'];
    expect(component.displayedColumns).toEqual(headers);
  })

});
