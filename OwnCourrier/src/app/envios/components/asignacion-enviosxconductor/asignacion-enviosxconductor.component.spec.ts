import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignacionEnviosxconductorComponent } from './asignacion-enviosxconductor.component';

describe('AsignacionEnviosxconductorComponent', () => {
  let component: AsignacionEnviosxconductorComponent;
  let fixture: ComponentFixture<AsignacionEnviosxconductorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsignacionEnviosxconductorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignacionEnviosxconductorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


});
