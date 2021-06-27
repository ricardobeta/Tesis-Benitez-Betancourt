import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutComponent } from './layout.component';

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Menú Principal Administrador formateado correctamente', () => {
    const menu = [
      { link: './', icono: 'home', nombre: 'Inicio',  },
      { link: 'envios', icono: 'local_shipping', nombre: 'Envíos'  },
      { link: 'motorizados', icono: 'delivery_dining_outlined', nombre: 'Motorizados' },
      { link: 'clientes', icono: 'contacts', nombre: 'Clientes' },
      { link: 'zonas-cobertura', icono: 'map', nombre: 'Zonas Cobertura' },
      { link: 'informacion', icono: 'settings', nombre: 'Configuración' },
      { link: '', icono: 'login', nombre: 'Cerrar Sesión', f: true }
    ]
    expect(component.items).toEqual(menu)
  })

});
