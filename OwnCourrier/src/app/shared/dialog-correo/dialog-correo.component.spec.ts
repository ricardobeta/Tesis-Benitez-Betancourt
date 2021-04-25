import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCorreoComponent } from './dialog-correo.component';

describe('DialogCorreoComponent', () => {
  let component: DialogCorreoComponent;
  let fixture: ComponentFixture<DialogCorreoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogCorreoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCorreoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
