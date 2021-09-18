import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEstadoComponent } from './dialog-estado.component';

describe('DialogEstadoComponent', () => {
  let component: DialogEstadoComponent;
  let fixture: ComponentFixture<DialogEstadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogEstadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEstadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
