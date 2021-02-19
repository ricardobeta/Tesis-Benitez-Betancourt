import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroEnvioComponent } from './registro-envio.component';

describe('RegistroEnvioComponent', () => {
  let component: RegistroEnvioComponent;
  let fixture: ComponentFixture<RegistroEnvioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroEnvioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroEnvioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
