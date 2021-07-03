import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvioClienteComponent } from './envio-cliente.component';

describe('EnvioClienteComponent', () => {
  let component: EnvioClienteComponent;
  let fixture: ComponentFixture<EnvioClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnvioClienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnvioClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
