import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZonasNegocioComponent } from './zonas-negocio.component';

describe('ZonasNegocioComponent', () => {
  let component: ZonasNegocioComponent;
  let fixture: ComponentFixture<ZonasNegocioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZonasNegocioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZonasNegocioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
