import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarEnviosComponent } from './asignar-envios.component';

describe('AsignarEnviosComponent', () => {
  let component: AsignarEnviosComponent;
  let fixture: ComponentFixture<AsignarEnviosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsignarEnviosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignarEnviosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
