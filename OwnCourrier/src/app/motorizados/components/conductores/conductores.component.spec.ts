import { ComponentFixture, TestBed } from '@angular/core/testing';


import { ConductoresComponent } from './conductores.component';

describe('ConductoresComponent', () => {
  let component: ConductoresComponent;
  let fixture: ComponentFixture<ConductoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConductoresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConductoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Renderizar Headers Tabla', () => {
    const headers = ['foto', 'cedula', 'nombreCompleto', 'celular', 'fecha', 'estado', 'acciones'];
    expect(component.displayedColumns).toEqual(headers);
  })

});
