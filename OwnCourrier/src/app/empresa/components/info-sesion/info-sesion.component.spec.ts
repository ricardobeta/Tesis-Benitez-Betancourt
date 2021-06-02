import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoSesionComponent } from './info-sesion.component';

describe('InfoSesionComponent', () => {
  let component: InfoSesionComponent;
  let fixture: ComponentFixture<InfoSesionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoSesionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoSesionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});
