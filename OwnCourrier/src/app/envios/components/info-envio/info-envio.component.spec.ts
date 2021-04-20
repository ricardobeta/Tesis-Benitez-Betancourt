import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoEnvioComponent } from './info-envio.component';

describe('InfoEnvioComponent', () => {
  let component: InfoEnvioComponent;
  let fixture: ComponentFixture<InfoEnvioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoEnvioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoEnvioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
