import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormZonaComponent } from './form-zona.component';

describe('FormZonaComponent', () => {
  let component: FormZonaComponent;
  let fixture: ComponentFixture<FormZonaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormZonaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormZonaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
