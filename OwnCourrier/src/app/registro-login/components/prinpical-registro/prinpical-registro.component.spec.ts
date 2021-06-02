import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrinpicalRegistroComponent } from './prinpical-registro.component';

describe('PrinpicalRegistroComponent', () => {
  let component: PrinpicalRegistroComponent;
  let fixture: ComponentFixture<PrinpicalRegistroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrinpicalRegistroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrinpicalRegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


});
