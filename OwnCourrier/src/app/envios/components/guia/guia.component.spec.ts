import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuiaComponent } from './guia.component';

describe('GuiaComponent', () => {
  let component: GuiaComponent;
  let fixture: ComponentFixture<GuiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuiaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GuiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


});
