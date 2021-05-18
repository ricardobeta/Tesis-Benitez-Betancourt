import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogProblemasComponent } from './dialog-problemas.component';

describe('DialogProblemasComponent', () => {
  let component: DialogProblemasComponent;
  let fixture: ComponentFixture<DialogProblemasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogProblemasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogProblemasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
