import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapaEnviosComponent } from './mapa-envios.component';

describe('MapaEnviosComponent', () => {
  let component: MapaEnviosComponent;
  let fixture: ComponentFixture<MapaEnviosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapaEnviosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapaEnviosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


});
