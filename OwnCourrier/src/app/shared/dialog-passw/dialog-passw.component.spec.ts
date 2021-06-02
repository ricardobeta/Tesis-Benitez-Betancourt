import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPasswComponent } from './dialog-passw.component';

describe('DialogPasswComponent', () => {
  let component: DialogPasswComponent;
  let fixture: ComponentFixture<DialogPasswComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogPasswComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogPasswComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


});
